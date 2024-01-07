import { IntersectionType, PickType } from '@nestjs/mapped-types';
import { EventEntity } from 'src/libs/entities';
import { EventLogEntity } from 'src/libs/entities/event-log.entity';

class EventAndEventLogMerged extends IntersectionType(
  EventEntity,
  EventLogEntity,
) {}

export class CreateEventCmd extends PickType(EventAndEventLogMerged, [
  'name',
  'timestamp',
] as const) {}
