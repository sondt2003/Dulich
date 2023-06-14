import { Module } from '@nestjs/common';
import { PlaceController } from './place.controller';
import { PlaceService } from './place.service';
import { CityService } from '../city/city.service';

@Module({
  controllers: [PlaceController],
  exports: [PlaceService],
  providers: [PlaceService, CityService],
})
export class PlaceModule {}
