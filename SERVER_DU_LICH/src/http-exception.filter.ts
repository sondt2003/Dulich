/* eslint-disable prettier/prettier */
import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();
    // response.status(status).json({
    //   statusCode: status,
    //   timestamp: new Date().toISOString(),
    //   path: request.url,
    // });
    console.log(status);
    if (status == 404) {
      response.status(status).render('errors/404');
    }
    if (status == 503) {
      response.status(status).render('errors/maintenance');
    }
  }
}
