import { Module } from '@nestjs/common';
import { PlaceController } from './place.controller';
import { PlaceService } from 'src/backend/place/place.service';
import { CityService } from 'src/backend/city/city.service';

@Module({
  controllers: [PlaceController],
  providers: [PlaceService, CityService],
})
export class PlaceModule {}
