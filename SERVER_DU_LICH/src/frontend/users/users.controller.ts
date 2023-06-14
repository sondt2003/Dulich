import { users } from '@prisma/client';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { UsersService } from 'src/backend/users/users.service';
import { idDTO } from 'src/common/base.dto';
import { userDTO } from 'src/common/users.dto';

@Controller('users')
export class UsersController {
  constructor(readonly UsersService: UsersService) {}
  @Get('/api')
  async getAuthors() {
    return await this.UsersService.Lists();
  }

  @Post('api/')
  async postData(@Body() user: userDTO): Promise<users> {
    const userReal = userDTO.plainToClass(user);
    return await this.UsersService.create(userReal);
  }

  @Patch('api/:id')
  async PatchData(
    @Param('id') id: idDTO,
    @Body() user: userDTO,
  ): Promise<users> {
    const userReal = userDTO.plainToClass(user);
    return await this.UsersService.update({
      where: { id: Number(id) },
      data: userReal,
    });
  }
  @Delete(':id')
  async Delete(@Param('id') id) {
    return await this.UsersService.delete({ id: Number(id) });
  }
}
