import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Post,
  Render,
  Res,
  Session,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { PlaceService } from './place.service';
import { idDTO } from 'src/common/base.dto';
import { placeDTO } from 'src/common/place.dto';
import { CityService } from '../city/city.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

@Controller('place')
export class PlaceController {
  constructor(
    private PlaceService: PlaceService,
    private CityService: CityService,
  ) {}
  @Get('/')
  @Render('place/lists/index')
  async getPlaces() {
    console.log(await this.PlaceService.Lists());
    return { Places: await this.PlaceService.Lists() };
  }
  @Get('/citys/:id')
  @Render('place/lists/index')
  async getCity(@Param() params: idDTO) {
    return { Places: await this.PlaceService.getCityPlace(Number(params.id)) };
  }
  //Add
  @Get('add')
  @Render('place/add/index')
  async getCreateAuthor() {
    console.log('Places add');
    return { city: await this.CityService.Lists() };
  }
  @Post('add')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './views/assets/photos',
        filename: function (req, file, cb) {
          const name = file.originalname.split('.')[0];
          const fileExtension = file.originalname.split('.')[1];
          const newFileName =
            name.split('').join('_') + '_' + Date.now() + '.' + fileExtension;
          cb(null, newFileName);
        },
      }),
      fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
          return cb(null, false);
        }
        cb(null, true);
      },
    }),
  )
  async postCreateAuthor(
    @Body() place: placeDTO,
    @Res() res,
    @UploadedFile() file: Express.Multer.File,
    @Session() session: Record<string, any>,
  ) {
    const placeReal = placeDTO.plainToClass(place);
    placeReal.users = {
      connect: { id: Number(session.user.id) },
    };
    placeReal.image = file.filename;
    placeReal.city = {
      connect: { id: Number(place.cityID) },
    };
    return await this.PlaceService.create(placeReal).then(() => {
      res.redirect('/place/');
    });
  }

  //Update
  @Get('update/:id')
  @Render('place/edit/index')
  async getUpdateAuthor(@Param() params: idDTO) {
    return {
      details: await this.PlaceService.details({
        id: Number(params.id),
      }),
      city: await this.CityService.Lists(),
    };
  }
  @Post('update/:id')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './views/assets/photos',
        filename: function (req, file, cb) {
          const name = file.originalname.split('.')[0];
          const fileExtension = file.originalname.split('.')[1];
          const newFileName =
            name.split('').join('_') + '_' + Date.now() + '.' + fileExtension;
          cb(null, newFileName);
        },
      }),
      fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
          return cb(null, false);
        }
        cb(null, true);
      },
    }),
  )
  async Patch(
    @Param() params: idDTO,
    @Body() place: placeDTO,
    @Res() res,
    @UploadedFile() file: Express.Multer.File,
    @Session() session: Record<string, any>,
  ) {
    const placeReal = placeDTO.plainToClass(place);
    placeReal.users = {
      connect: { id: Number(session.user.id) },
    };
    placeReal.image = file.filename;
    await this.PlaceService.update({
      where: { id: Number(params.id) },
      data: placeDTO.plainToClass(placeReal),
    }).then(() => {
      res.redirect('/place/');
    });
  }

  //Delete
  @Post('delete/:id')
  async Delete(@Param() params: idDTO) {
    return await this.PlaceService.delete({
      id: Number(params.id),
    });
  }
}
