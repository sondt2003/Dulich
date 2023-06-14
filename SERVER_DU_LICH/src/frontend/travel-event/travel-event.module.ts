import { Module } from '@nestjs/common';
import { TravelEventController } from './travel-event.controller';
import { TravelEventService } from 'src/backend/travel-event/travel-event.service';

@Module({
  controllers: [TravelEventController],
  providers: [TravelEventService],
})
export class TravelEventModule {}
