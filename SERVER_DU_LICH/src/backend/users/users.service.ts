import { Prisma, users } from '@prisma/client';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private PrismaService: PrismaService) {}
  async create(data: Prisma.usersCreateInput): Promise<users> {
    return this.PrismaService.users.create({ data });
  }
  async details(
    usersWhereUniqueInput: Prisma.usersWhereUniqueInput,
  ): Promise<users | null> {
    return this.PrismaService.users.findUnique({
      where: usersWhereUniqueInput,
    });
  }
  async Lists() {
    return this.PrismaService.users.findMany({
      include: {
        place: true,
      },
    });
  }
  async update(params: {
    where: Prisma.usersWhereUniqueInput;
    data: Prisma.usersUpdateInput;
  }): Promise<users> {
    return this.PrismaService.users.update(params);
  }
  async delete(
    usersWhereUniqueInput: Prisma.usersWhereUniqueInput,
  ): Promise<users> {
    return this.PrismaService.users.delete({
      where: usersWhereUniqueInput,
    });
  }
}
