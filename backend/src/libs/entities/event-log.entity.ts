import { EventLog } from '@prisma/client';
import { Type } from 'class-transformer';
import { IsDate } from 'class-validator';

export class EventLogEntity implements EventLog {
  id: number;
  eventId: number;

  @IsDate()
  @Type(() => Date)
  timestamp: Date;
  createdAt: Date;
  updatedAt: Date;
}
