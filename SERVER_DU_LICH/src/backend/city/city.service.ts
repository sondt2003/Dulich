import { Injectable } from '@nestjs/common';
import { Prisma, city } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
@Injectable()
export class CityService {
  constructor(private PrismaService: PrismaService) {}
  async create(data: Prisma.cityCreateInput): Promise<city> {
    return this.PrismaService.city.create({ data });
  }
  async details(
    cityWhereUniqueInput: Prisma.cityWhereUniqueInput,
  ): Promise<city | null> {
    return this.PrismaService.city.findUnique({
      where: cityWhereUniqueInput,
    });
  }
  async Lists(): Promise<city[]> {
    return this.PrismaService.city.findMany({});
  }
  async update(params: {
    where: Prisma.cityWhereUniqueInput;
    data: Prisma.cityUpdateInput;
  }): Promise<city> {
    return this.PrismaService.city.update(params);
  }
  async delete(
    cityWhereUniqueInput: Prisma.cityWhereUniqueInput,
  ): Promise<city> {
    return this.PrismaService.city.delete({
      where: cityWhereUniqueInput,
    });
  }
}
