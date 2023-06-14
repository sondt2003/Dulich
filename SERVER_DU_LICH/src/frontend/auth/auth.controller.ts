import * as argon from 'argon2';
import { users } from '@prisma/client';
import { userDTO } from 'src/common/users.dto';
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
import { AuthService } from 'src/backend/auth/auth.service';
@Controller('auth')
export class AuthController {
  constructor(private AuthService: AuthService) {}

  @Post('/login/api')
  async PostUserById(
    @Request() request,
    @Session() session: Record<string, any>,
  ) {
    return await this.AuthService.login(
      request.body.email,
      request.body.password,
    ).then((response) => {
      session.user = response.user;
      return 'success login';
    });
  }
  @Post('/register/api')
  async signupUser(
    @Body() user: authDTO,
    @Session() session: Record<string, any>,
  ) {
    const userMessageReal = authDTO.plainToClass(user);
    userMessageReal.password = await argon.hash(user.password);
    return await this.AuthService.register(userMessageReal).then(() => {
      session.user = userMessageReal;
      console.log('success register');
    });
  }
}
