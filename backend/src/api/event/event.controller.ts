import { Body, Controller, Post } from '@nestjs/common';
import { TimeUnit } from '@prisma/client';
import { plainToClass } from 'class-transformer';
import dayjs, { OpUnitType } from 'dayjs';
import { PrismaService } from 'nestjs-prisma';
import { OkResult } from 'src/libs/dtos/ok.dto';
import {
  CountPerTimeReportQuery,
  CountPerTimeReportResult,
} from './dtos/count-per-time-report.event.dto';
import { CreateEventCmd } from './dtos/create.event.dto';

@Controller('/events')
export class EventController {
  constructor(private readonly db: PrismaService) {}

  @Post()
  async create(@Body() cmd: CreateEventCmd): Promise<OkResult> {
    const event = await this.db.event.upsert({
      where: {
        name: cmd.name,
      },
      create: { name: cmd.name, count: 1 },
      update: { count: { increment: 1 } },
    });

    await this.db.eventLog.create({
      data: {
        event: {
          connect: {
            name: cmd.name,
          },
        },
        timestamp: cmd.timestamp,
      },
    });

    // Optimize use queue
    const timeUnits: TimeUnit[] = ['MINUTE', 'HOUR', 'DAY', 'MONTH', 'YEAR'];
    await this.db.$transaction(
      timeUnits.map((tu) => {
        const timestamp = dayjs(cmd.timestamp)
          .set('millisecond', 0)
          .startOf(tu.toLowerCase() as OpUnitType);

        return this.db.eventCountPerTimeReport.upsert({
          where: {
            eventId_timeUnit_timestamp: {
              eventId: event.id,
              timestamp: timestamp.toDate(),
              timeUnit: tu,
            },
          },
          create: {
            count: 1,
            timeUnit: tu,
            timestamp: timestamp.toDate(),
            eventId: event.id,
          },
          update: {
            count: { increment: 1 },
          },
        });
      }),
    );

    return new OkResult();
  }

  @Post('/count-per-time-report')
  async countPerTimeReport(@Body() cmd: CountPerTimeReportQuery) {
    cmd.isValid();
    const result = await this.db.eventCountPerTimeReport.findMany({
      orderBy: {
        id: 'desc',
      },
      include: { event: true },
      where: {
        ...(cmd.name && {
          event: {
            name: cmd.name,
          },
        }),
        timeUnit: {
          in: cmd.timeUnit,
        },
        ...(cmd.start && {
          timestamp: {
            gte: cmd.start,
            lte: cmd.end,
          },
        }),
      },
    });

    return result.map((r) => plainToClass(CountPerTimeReportResult, r));
  }
}
