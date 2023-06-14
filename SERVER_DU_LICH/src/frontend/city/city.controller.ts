import { city } from '@prisma/client';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CityService } from 'src/backend/city/city.service';
import { cityDTO } from 'src/common/city.dto';
import { idDTO } from 'src/common/base.dto';

@Controller('city')
export class CityController {
  constructor(readonly CityService: CityService) {}
  @Get('/api')
  async getAuthors() {
    return await this.CityService.Lists();
  }
  //Update
  @Get('/api/:id')
  async getCityID(@Param() params: idDTO) {
    return {
      city: await this.CityService.details({
        id: Number(params.id),
      }),
    };
  }
  @Post('api/')
  async postData(@Body() city: cityDTO): Promise<city> {
    const cityReal = cityDTO.plainToClass(city);
    cityReal.users = {
      connect: { id: Number(city.userID) },
    };
    return await this.CityService.create(cityReal);
  }

  @Patch('api/:id')
  async PatchData(
    @Param('id') id: idDTO,
    @Body() city: cityDTO,
  ): Promise<city> {
    const cityReal = cityDTO.plainToClass(city);
    cityReal.users = {
      connect: { id: Number(city.userID) },
    };
    return await this.CityService.update({
      where: { id: Number(id) },
      data: cityReal,
    });
  }
  @Delete('api/:id')
  async Delete(@Param('id') id) {
    return await this.CityService.delete({ id: Number(id) });
  }
}
