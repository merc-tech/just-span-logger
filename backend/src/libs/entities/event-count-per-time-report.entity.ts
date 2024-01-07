import { EventCountPerTimeReport, TimeUnit } from '@prisma/client';
import { Expose } from 'class-transformer';

export class EventCountPerTimeReportEntity implements EventCountPerTimeReport {
  id: number;
  eventId: number;
  @Expose()
  timeUnit: TimeUnit;
  @Expose()
  timestamp: Date;
  @Expose()
  count: number;
  createdAt: Date;
  updatedAt: Date;
}
