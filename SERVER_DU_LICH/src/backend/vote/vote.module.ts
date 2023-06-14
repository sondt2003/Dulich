import { Module } from '@nestjs/common';
import { VoteController } from './vote.controller';
import { VoteService } from './vote.service';

@Module({
  controllers: [VoteController],
  exports: [VoteService],
  providers: [VoteService],
})
export class VoteModule {}
