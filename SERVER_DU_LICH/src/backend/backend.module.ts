import { Module } from '@nestjs/common';
import { UsersService } from './users/users.service';
import { PlaceService } from './place/place.service';
import { CityService } from './city/city.service';
import { CommentService } from './comment/comment.service';
import { TravelEventService } from './travel-event/travel-event.service';
import { VoteService } from './vote/vote.service';
import { UsersModule } from './users/users.module';
import { PlaceModule } from './place/place.module';
import { CityModule } from './city/city.module';
import { CommentModule } from './comment/comment.module';
import { TravelEventModule } from './travel-event/travel-event.module';
import { VoteModule } from './vote/vote.module';
import { AuthModule } from './auth/auth.module';

@Module({
  providers: [
    UsersService,
    PlaceService,
    CityService,
    CommentService,
    TravelEventService,
    VoteService,
  ],
  imports: [
    UsersModule,
    PlaceModule,
    CityModule,
    CommentModule,
    TravelEventModule,
    VoteModule,
    AuthModule,
  ],
})
export class BackendModule {}
