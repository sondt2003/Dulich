import { TravelEventService } from './travel-event.service';
import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Render,
  Res,
} from '@nestjs/common';
import { idDTO } from 'src/common/base.dto';
import { travelEventDTO } from 'src/common/travel-event.dto';
import { PlaceService } from '../place/place.service';

@Controller('travelEvent')
export class TravelEventController {
  constructor(
    private TravelEventService: TravelEventService,
    private PlaceService: PlaceService,
  ) {}
  @Get('/')
  @Render('travelEvent/lists/index')
  async getTravelEventAll() {
    return {
      travelEvents: await this.TravelEventService.Lists(),
    };
  }
  @Get('/places/:id')
  @Render('travelEvent/lists/index')
  async getTravelEvent(@Param() Param: idDTO) {
    return {
      travelEvents: await this.TravelEventService.detailsTravelEventPlace(
        Number(Param.id),
      ),
    };
  }
  //Add
  @Get('add')
  @Render('travelEvent/add/index')
  async getCreateAuthor() {
    console.log('travelEvent add');
    return { places: await this.PlaceService.Lists() };
  }
  @Post('add')
  async postCreateAuthor(@Body() author: travelEventDTO, @Res() res) {
    const cityReal = travelEventDTO.plainToClass(author);
    cityReal.place = {
      connect: { id: Number(author.placeID) },
    };
    cityReal.dateStart = new Date(cityReal.dateStart);
    cityReal.dateEnd = new Date(cityReal.dateEnd);
    return await this.TravelEventService.create(cityReal).then(() => {
      res.redirect('/travelEvent/');
    });
  }

  //Update
  @Get('update/:id')
  @Render('travelEvent/edit/index')
  async getUpdateAuthor(@Param() params: idDTO) {
    return {
      details: await this.TravelEventService.details({
        id: Number(params.id),
      }),
      places: await this.PlaceService.Lists(),
    };
  }
  @Post('update/:id')
  async Patch(
    @Param() params: idDTO,
    @Body() author: travelEventDTO,
    @Res() res,
  ) {
    const cityReal = travelEventDTO.plainToClass(author);
    cityReal.place = {
      connect: { id: Number(author.placeID) },
    };
    cityReal.dateStart = new Date(cityReal.dateStart);
    cityReal.dateEnd = new Date(cityReal.dateEnd);
    return await this.TravelEventService.update({
      where: { id: Number(params.id) },
      data: cityReal,
    }).then(() => {
      res.redirect('/travelEvent/');
    });
  }

  //Delete
  @Post('delete/:id')
  async Delete(@Param() params: idDTO) {
    return await this.TravelEventService.delete({
      id: Number(params.id),
    });
  }
}
