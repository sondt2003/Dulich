/* eslint-disable prettier/prettier */
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Response, NextFunction } from 'express';
@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: any, res: Response, next: NextFunction) {
    console.log('Request..');
    if (req.session.user) {
      console.log("có")
      console.log(req.session.user)
      next();
    } else {
      console.log("không có session")
      return res.redirect('/auth/Login');
    }
  }
}
