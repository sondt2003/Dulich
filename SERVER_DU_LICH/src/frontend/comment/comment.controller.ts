import { comment } from '@prisma/client';
import { commentDTO } from './../../common/comment.dto';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CommentService } from 'src/backend/comment/comment.service';
import { idDTO } from 'src/common/base.dto';

@Controller('comment')
export class CommentController {
  constructor(readonly CommentService: CommentService) {}
  @Get('/api')
  async getAuthors() {
    return await this.CommentService.Lists();
  }
  //Update
  @Get('/api/:id')
  async getUpdateAuthor(@Param() params: idDTO) {
    return {
      Comment: await this.CommentService.details({
        id: Number(params.id),
      }),
    };
  }
  @Post('api/')
  async postData(@Body() comment: commentDTO): Promise<comment> {
    const cityReal = commentDTO.plainToClass(comment);
    cityReal.users = {
      connect: { id: Number(comment.userID) },
    };
    return await this.CommentService.create(cityReal);
  }

  @Patch('api/:id')
  async PatchData(
    @Param('id') id: idDTO,
    @Body() comment: commentDTO,
  ): Promise<comment> {
    const cityReal = commentDTO.plainToClass(comment);
    cityReal.users = {
      connect: { id: Number(comment.userID) },
    };
    return await this.CommentService.update({
      where: { id: Number(id) },
      data: cityReal,
    });
  }
  @Delete(':id')
  async Delete(@Param('id') id) {
    return await this.CommentService.delete({ id: Number(id) });
  }
}
