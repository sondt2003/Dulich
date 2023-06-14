import { Module } from '@nestjs/common';
import { VoteController } from './vote.controller';
import { VoteService } from 'src/backend/vote/vote.service';

@Module({
  controllers: [VoteController],
  providers: [VoteService],
})
export class VoteModule {}
