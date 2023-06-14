import { Module } from '@nestjs/common';
import { TravelEventController } from './travel-event.controller';
import { TravelEventService } from './travel-event.service';
import { PlaceService } from '../place/place.service';

@Module({
  controllers: [TravelEventController],
  exports: [TravelEventService],
  providers: [TravelEventService, PlaceService],
})
export class TravelEventModule {}
