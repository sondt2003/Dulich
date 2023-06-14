import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Render,
  Res,
  Session,
} from '@nestjs/common';
import { idDTO } from 'src/common/base.dto';
import { cityDTO } from 'src/common/city.dto';
import { CityService } from './city.service';

@Controller('city')
export class CityController {
  constructor(private CityService: CityService) {}
  @Get('/')
  @Render('city/lists/index')
  async getCity() {
    return { city: await this.CityService.Lists() };
  }

  //Add
  @Get('add')
  @Render('city/add/index')
  async getCreateCity() {
    console.log('city add');
  }
  @Post('add')
  async postCreateCity(
    @Body() City: cityDTO,
    @Res() res,
    @Session() session: Record<string, any>,
  ) {
    const cityReal = cityDTO.plainToClass(City);

    cityReal.users = {
      connect: { id: Number(session.user.id) },
    };
    return await this.CityService.create(cityReal).then(() => {
      res.redirect('/city/');
    });
  }

  //Update
  @Get('update/:id')
  @Render('city/edit/index')
  async getUpdateCity(@Param() params: idDTO) {
    return {
      city: await this.CityService.details({
        id: Number(params.id),
      }),
    };
  }
  @Post('update/:id')
  async Patch(
    @Param() params: idDTO,
    @Body() City: cityDTO,
    @Res() res,
    @Session() session: Record<string, any>,
  ) {
    const cityReal = cityDTO.plainToClass(City);
    cityReal.users = {
      connect: { id: Number(session.user.id) },
    };
    await this.CityService.update({
      where: { id: Number(params.id) },
      data: cityReal,
    }).then(() => {
      res.redirect('/city/');
    });
  }

  //Delete
  @Get('delete/:id')
  async Delete(@Param() params: idDTO, @Res() res) {
    return await this.CityService.delete({
      id: Number(params.id),
    }).then(() => {
      res.redirect('/city/');
    });
  }
}
