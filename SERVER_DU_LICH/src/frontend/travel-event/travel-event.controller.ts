import { travelEvent } from '@prisma/client';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { TravelEventService } from 'src/backend/travel-event/travel-event.service';
import { travelEventDTO } from 'src/common/travel-event.dto';
import { idDTO } from 'src/common/base.dto';

@Controller('travel-event')
export class TravelEventController {
  constructor(readonly TravelEventService: TravelEventService) {}
  @Get('/api')
  async getAuthors() {
    return await this.TravelEventService.Lists();
  }
  //Update
  @Get('/api/:id')
  async getUpdateAuthor(@Param() params: idDTO) {
    return {
      details: await this.TravelEventService.details({
        id: Number(params.id),
      }),
    };
  }
  @Post('api/')
  async postData(@Body() travelEvent: travelEventDTO): Promise<travelEvent> {
    const travelEventReal = travelEventDTO.plainToClass(travelEvent);
    travelEventReal.place = {
      connect: { id: Number(travelEvent.placeID) },
    };
    return await this.TravelEventService.create(travelEventReal);
  }

  @Patch('api/:id')
  async PatchData(
    @Param('id') id: idDTO,
    @Body() travelEvent: travelEventDTO,
  ): Promise<travelEvent> {
    const travelEventReal = travelEventDTO.plainToClass(travelEvent);
    travelEventReal.place = {
      connect: { id: Number(travelEvent.placeID) },
    };
    return await this.TravelEventService.update({
      where: { id: Number(id) },
      data: travelEventReal,
    });
  }
  @Delete(':id')
  async Delete(@Param('id') id) {
    return await this.TravelEventService.delete({ id: Number(id) });
  }
}
