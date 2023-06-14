import { PlaceService } from './../place/place.service';
import { CommentService } from './comment.service';
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
import { commentDTO } from 'src/common/comment.dto';

@Controller('comment')
export class CommentController {
  constructor(
    private CommentService: CommentService,
    private PlaceService: PlaceService,
  ) {}
  @Get('places/:id')
  @Render('comment/lists/index')
  async getComment(@Param() params: idDTO) {
    return {
      comments: await this.CommentService.detailsCommentPlace(
        Number(params.id),
      ),
    };
  }
  @Get('/')
  @Render('comment/lists/index')
  async getCommentAll() {
    return {
      comments: await this.CommentService.Lists(),
    };
  }
  //Add
  @Get('add')
  @Render('Comment/add/index')
  async getCreateAuthor() {
    return { Places: await this.PlaceService.Lists() };
  }
  @Post('add')
  async postCreateAuthor(
    @Body() author: commentDTO,
    @Session() session: Record<string, any>,
  ) {
    const commentReal = commentDTO.plainToClass(author);
    commentReal.users = {
      connect: { id: Number(session.user.id) },
    };
    commentReal.place = {
      connect: { id: Number(author.placeID) },
    };
    return await this.CommentService.create(commentReal);
  }

  //Update
  @Get('update/:id')
  @Render('Comment/edit/index')
  async getUpdateAuthor(@Param() params: idDTO) {
    return {
      Comment: await this.CommentService.details({
        id: Number(params.id),
      }),
      Places: await this.PlaceService.Lists(),
    };
  }
  @Post('update/:id')
  async Patch(
    @Param() params: idDTO,
    @Body() author: commentDTO,
    @Res() res,
    @Session() session: Record<string, any>,
  ) {
    const commentReal = commentDTO.plainToClass(author);
    commentReal.users = {
      connect: { id: Number(session.user.id) },
    };
    commentReal.place = {
      connect: { id: Number(author.placeID) },
    };
    await this.CommentService.update({
      where: { id: Number(params.id) },
      data: commentReal,
    }).then(() => {
      res.redirect('/Comment/');
    });
  }

  //Delete
  @Post('delete/:id')
  async Delete(@Param() params: idDTO) {
    return await this.CommentService.delete({
      id: Number(params.id),
    });
  }
}
