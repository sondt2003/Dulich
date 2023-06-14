import {
  Module,
  NestModule,
  MiddlewareConsumer,
  RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BackendModule } from './backend/backend.module';
import { PrismaModule } from './prisma/prisma.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './jwt/jwt';
import { FrontendModule } from './frontend/frontend.module';
import { LoggerMiddleware } from './middleware/logger.middleware';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [
    BackendModule,
    PrismaModule,
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60' },
    }),
    FrontendModule,
    MulterModule.register({
      dest: './uploads',
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .exclude({ path: 'auth', method: RequestMethod.ALL }, 'auth/(.*)')
      .forRoutes({ path: '*', method: RequestMethod.GET });
  }
}
