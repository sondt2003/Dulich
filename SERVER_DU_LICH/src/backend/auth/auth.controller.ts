import * as argon from 'argon2';
import { users } from '@prisma/client';
import { userDTO } from 'src/common/users.dto';
import { AuthService } from './auth.service';
import {
  Body,
  Controller,
  Get,
  Post,
  Render,
  Request,
  Res,
  Session,
} from '@nestjs/common';
import { authDTO } from 'src/common/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private AuthService: AuthService) {}
  @Get('/login')
  @Render('login/index')
  async getUserById() {
    return { msgEmail: '', msgPassword: '' };
  }
  @Post('/login')
  async PostUserById(
    @Request() request,
    @Res() res,
    @Session() session: Record<string, any>,
  ) {
    return await this.AuthService.login(
      request.body.emailUsername,
      request.body.password,
    ).then((response) => {
      session.user = response.user;
      if (response.auth) {
        res.redirect('/users/lists');
      }
    });
  }
  @Get('/register')
  @Render('register/index')
  async get() {
    return { msgEmail: '', msgPassword: '' };
  }
  @Post('/register')
  async signupUser(
    @Body() user: authDTO,
    @Res() res,
    @Session() session: Record<string, any>,
  ) {
    const userMessageReal = authDTO.plainToClass(user);
    userMessageReal.password = await argon.hash(user.password);
    return await this.AuthService.register(userMessageReal).then(() => {
      session.user = userMessageReal;
      res.redirect('/users/lists');
      console.log('success');
    });
  }
}
