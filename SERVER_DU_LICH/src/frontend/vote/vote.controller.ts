import { vote } from '@prisma/client';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { VoteService } from 'src/backend/vote/vote.service';
import { voteDTO } from 'src/common/vote.dto';
import { idDTO } from 'src/common/base.dto';

@Controller('vote')
export class VoteController {
  constructor(readonly VoteService: VoteService) {}
  @Get('/api')
  async getAuthors() {
    return await this.VoteService.Lists();
  }
  //Update
  @Get('/api/:id')
  async getUpdateAuthor(@Param() params: idDTO) {
    return {
      details: await this.VoteService.details({
        id: Number(params.id),
      }),
    };
  }
  @Post('api/')
  async postData(@Body() vote: voteDTO): Promise<vote> {
    const voteReal = voteDTO.plainToClass(vote);
    voteReal.users = {
      connect: { id: Number(vote.userID) },
    };
    voteReal.place = {
      connect: { id: Number(vote.placeID) },
    };
    return await this.VoteService.create(voteReal);
  }

  @Patch('api/:id')
  async PatchData(
    @Param('id') id: idDTO,
    @Body() vote: voteDTO,
  ): Promise<vote> {
    const voteReal = voteDTO.plainToClass(vote);
    voteReal.users = {
      connect: { id: Number(vote.userID) },
    };
    voteReal.place = {
      connect: { id: Number(vote.placeID) },
    };
    return await this.VoteService.update({
      where: { id: Number(id) },
      data: voteReal,
    });
  }
  @Delete(':id')
  async Delete(@Param('id') id) {
    return await this.VoteService.delete({ id: Number(id) });
  }
}
