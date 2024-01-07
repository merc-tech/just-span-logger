import { Event } from '@prisma/client';
import { Expose } from 'class-transformer';
import { IsString } from 'class-validator';

export class EventEntity implements Event {
  id: number;

  @Expose()
  @IsString()
  name: string;

  count: number;

  createdAt: Date;
  updatedAt: Date;
}
