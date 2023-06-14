import { Controller, Get, Req, Session } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
  @Get()
  findAll(@Session() session: Record<string, any>) {
    session.visits = session.visits ? session.visits + 1 : 1;
    return session.visits;
  }
}
