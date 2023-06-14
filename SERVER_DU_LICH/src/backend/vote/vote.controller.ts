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
import { VoteService } from './vote.service';
import { voteDTO } from 'src/common/vote.dto';
import { idDTO } from 'src/common/base.dto';

@Controller('vote')
export class VoteController {
  constructor(private VoteService: VoteService) {}
  @Get('/')
  @Render('vote/lists/index')
  async getList() {
    return { votes: await this.VoteService.Lists() };
  }
  @Get('/places/:id')
  @Render('vote/lists/index')
  async getPlaceList() {
    return { votes: await this.VoteService.Lists() };
  }
  //Add
  @Get('add')
  @Render('vote/add/index')
  async getCreateAuthor() {
    console.log('authors add');
  }
  @Post('add')
  async postCreateAuthor(
    @Body() author: voteDTO,
    @Session() session: Record<string, any>,
  ) {
    const cityReal = voteDTO.plainToClass(author);
    cityReal.users = {
      connect: { id: Number(session.user.id) },
    };
    cityReal.place = {
      connect: { id: Number(author.placeID) },
    };

    return await this.VoteService.create(cityReal);
  }

  //Update
  @Get('update/:id')
  @Render('authors/edit/index')
  async getUpdateAuthor(@Param() params: idDTO) {
    return {
      authors: await this.VoteService.details({
        id: Number(params.id),
      }),
    };
  }
  @Post('update/:id')
  async Patch(
    @Param() params: idDTO,
    @Body() author: voteDTO,
    @Res() res,
    @Session() session: Record<string, any>,
  ) {
    const cityReal = voteDTO.plainToClass(author);
    cityReal.users = {
      connect: { id: Number(session.user.id) },
    };
    cityReal.place = {
      connect: { id: Number(author.placeID) },
    };
    await this.VoteService.update({
      where: { id: Number(params.id) },
      data: cityReal,
    }).then(() => {
      res.redirect('/vote/');
    });
  }

  //Delete
  @Post('delete/:id')
  async Delete(@Param() params: idDTO) {
    return await this.VoteService.delete({
      id: Number(params.id),
    });
  }
}
