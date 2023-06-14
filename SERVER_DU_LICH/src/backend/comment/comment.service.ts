import { Prisma, comment, place } from '@prisma/client';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CommentService {
  constructor(private PrismaService: PrismaService) {}
  async create(data: Prisma.commentCreateInput): Promise<comment> {
    return this.PrismaService.comment.create({ data });
  }
  async details(
    commentWhereUniqueInput: Prisma.commentWhereUniqueInput,
  ): Promise<comment | null> {
    return this.PrismaService.comment.findUnique({
      where: commentWhereUniqueInput,
    });
  }
  async detailsCommentPlace(id: number): Promise<comment[]> {
    return this.PrismaService.comment.findMany({
      where: { placeID: id },
    });
  }
  async Lists(): Promise<comment[]> {
    return this.PrismaService.comment.findMany({});
  }
  async update(params: {
    where: Prisma.commentWhereUniqueInput;
    data: Prisma.commentUpdateInput;
  }): Promise<comment> {
    return this.PrismaService.comment.update(params);
  }
  async delete(
    commentWhereUniqueInput: Prisma.commentWhereUniqueInput,
  ): Promise<comment> {
    return this.PrismaService.comment.delete({
      where: commentWhereUniqueInput,
    });
  }
}
