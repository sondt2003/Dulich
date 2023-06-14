import { Prisma, users } from '@prisma/client';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import * as argon from 'argon2';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthService {
  constructor(
    private PrismaService: PrismaService,
    private jwtService: JwtService,
  ) {}
  async login(email: string, password: string) {
    try {
      let auth = true;
      let msgEmail = '';
      let msgPassword = '';
      let token = null;
      const userData = await this.PrismaService.users.findMany({
        where: { email: email },
      });
      if (userData.length > 0) {
        const passwordMatched = await argon.verify(
          userData[0].password,
          password,
        );
        if (passwordMatched) {
          token = await this.jwtService.signAsync({
            email: userData[0].email,
            hashPassword: userData[0].password,
          });
          await this.PrismaService.users.update({
            where: { email: email },
            data: {
              remember_token: token,
            },
          });
        } else {
          msgPassword = 'Mật Khẩu Sai';
          msgEmail = '';
          auth = false;
        }
      } else {
        msgEmail = 'Tài Khoản Email Không Tồn Tại';
        msgPassword = '';
        auth = false;
      }
      return {
        user: userData[0],
        msgEmail: msgEmail,
        msgPassword: msgPassword,
        auth: auth,
        token: token,
      };
    } catch (error) {
      console.log(error);
    }
  }
  async register(data: Prisma.usersCreateInput): Promise<users | object> {
    try {
      const token = await this.jwtService.signAsync({
        email: data.email,
        hashPassword: data.password,
      });
      data.remember_token = token;
      const user = await this.PrismaService.users.create({ data });
      return user;
    } catch (error) {
      return { msg: error.code };
    }
  }
}
