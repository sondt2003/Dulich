import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { PlaceModule } from './place/place.module';
import { CityModule } from './city/city.module';
import { CommentModule } from './comment/comment.module';
import { TravelEventModule } from './travel-event/travel-event.module';
import { VoteModule } from './vote/vote.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [UsersModule, PlaceModule, CityModule, CommentModule, TravelEventModule, VoteModule, AuthModule]
})
export class FrontendModule {}
