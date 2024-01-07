import { BadRequestException } from '@nestjs/common';
import { PickType } from '@nestjs/mapped-types';
import { TimeUnit } from '@prisma/client';
import { Expose, Type } from 'class-transformer';
import { IsDate, IsEnum, IsOptional, IsString } from 'class-validator';
import dayjs from 'dayjs';
import { EventCountPerTimeReportEntity, EventEntity } from 'src/libs/entities';

export class CountPerTimeReportQuery {
  @IsString()
  @IsOptional()
  name: string;

  @IsEnum(TimeUnit, { each: true })
  timeUnit: TimeUnit[];

  @Type(() => Date)
  @IsDate()
  @IsOptional()
  start: Date;

  @Type(() => Date)
  @IsDate()
  @IsOptional()
  end: Date;

  isValid() {
    if (this.start || this.end)
      if (!dayjs(this.start).isBefore(dayjs(this.end)))
        throw new BadRequestException('star date must before end date');
  }
}

class CountPerTimeReportEvent extends PickType(EventEntity, [
  'name',
] as const) {}

export class CountPerTimeReportResult extends PickType(
  EventCountPerTimeReportEntity,
  ['count', 'timestamp', 'timeUnit'] as const,
) {
  @Expose()
  @Type(() => CountPerTimeReportEvent)
  event: CountPerTimeReportEvent;
}
