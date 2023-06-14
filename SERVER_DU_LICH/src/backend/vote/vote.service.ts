import { Prisma, vote } from '@prisma/client';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class VoteService {
  constructor(private PrismaService: PrismaService) {}
  async create(data: Prisma.voteCreateInput): Promise<vote> {
    return this.PrismaService.vote.create({ data });
  }
  async details(
    voteWhereUniqueInput: Prisma.voteWhereUniqueInput,
  ): Promise<vote | null> {
    return this.PrismaService.vote.findUnique({
      where: voteWhereUniqueInput,
    });
  }
  async detailsPlaceList(id: number): Promise<vote[]> {
    return this.PrismaService.vote.findMany({
      where: { placeID: id },
    });
  }
  async Lists(): Promise<vote[]> {
    return this.PrismaService.vote.findMany({});
  }
  async update(params: {
    where: Prisma.voteWhereUniqueInput;
    data: Prisma.voteUpdateInput;
  }): Promise<vote> {
    return this.PrismaService.vote.update(params);
  }
  async delete(
    voteWhereUniqueInput: Prisma.voteWhereUniqueInput,
  ): Promise<vote> {
    return this.PrismaService.vote.delete({
      where: voteWhereUniqueInput,
    });
  }
}
