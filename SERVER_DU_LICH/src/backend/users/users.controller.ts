import { users } from '@prisma/client';
import { UsersService } from './users.service';
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
import { userDTO } from 'src/common/users.dto';
import * as argon from 'argon2';
@Controller('users')
export class UsersController {
  constructor(private UsersService: UsersService) {}
  @Get('lists')
  @Render('user/lists/index')
  async getUsers() {
    return { users: await this.UsersService.Lists() };
  }
  @Get('/update/:id')
  @Render('user/edit/index')
  async getUpdate(@Param('id') id: number) {
    return { details: await this.UsersService.details({ id: Number(id) }) };
  }
  @Post('/update/:id')
  async Patch(
    @Param() params: idDTO,
    @Body() user: userDTO,
    @Res() res,
  ): Promise<users | any> {
    const userMessageReal = userDTO.plainToClass(user);
    userMessageReal.active = String(user.active) == 'true' ? true : false;
    console.log(userMessageReal.active);
    if (userMessageReal.password.length > 0) {
      console.log(userMessageReal.password.length);
      userMessageReal.password = await argon.hash(user.password);
    } else {
      userMessageReal.password = undefined;
    }
    return await this.UsersService.update({
      where: { id: Number(params.id) },
      data: userMessageReal,
    }).then(() => {
      return res.redirect('/users/lists');
    });
  }

  @Get('/delete/:id')
  async getDelete(@Param('id') id: number, @Res() res) {
    return await this.UsersService.delete({ id: Number(id) }).then(() => {
      return res.redirect('/users/lists');
    });
  }

  @Get('/session')
  async getUser(@Session() session: Record<string, any>) {
    return session.user;
  }
}
