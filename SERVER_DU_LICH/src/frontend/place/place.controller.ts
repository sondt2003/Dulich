import { CityService } from './../../backend/city/city.service';
import { place } from '@prisma/client';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { PlaceService } from 'src/backend/place/place.service';
import { idDTO } from 'src/common/base.dto';
import { placeDTO } from 'src/common/place.dto';

@Controller('place')
export class PlaceController {
  constructor(
    private PlaceService: PlaceService,
    private CityService: CityService,
  ) {}
  @Get('/api')
  async getAuthors() {
    return await this.PlaceService.Lists();
  }
  //Update
  @Get('/api/:id')
  async getUpdateAuthor(@Param() params: idDTO) {
    return {
      details: await this.PlaceService.details({
        id: Number(params.id),
      }),
    };
  }
  @Post('api/')
  async postData(@Body() place: placeDTO): Promise<place> {
    const placeReal = placeDTO.plainToClass(place);
    placeReal.users = {
      connect: { id: Number(place.userID) },
    };
    return await this.PlaceService.create(placeReal);
  }

  @Patch('api/:id')
  async PatchData(
    @Param('id') id: idDTO,
    @Body() place: placeDTO,
  ): Promise<place> {
    const placeReal = placeDTO.plainToClass(place);
    placeReal.users = {
      connect: { id: Number(place.userID) },
    };
    return await this.PlaceService.update({
      where: { id: Number(id) },
      data: placeReal,
    });
  }
  @Delete(':id')
  async Delete(@Param('id') id) {
    return await this.PlaceService.delete({ id: Number(id) });
  }
}
