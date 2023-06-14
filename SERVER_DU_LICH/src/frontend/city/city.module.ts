import { Module } from '@nestjs/common';
import { CityController } from './city.controller';
import { CityService } from 'src/backend/city/city.service';

@Module({
  controllers: [CityController],
  providers: [CityService],
})
export class CityModule {}
