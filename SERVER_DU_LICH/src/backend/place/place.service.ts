import { Prisma, place, city } from '@prisma/client';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PlaceService {
  constructor(private PrismaService: PrismaService) {}
  async create(data: Prisma.placeCreateInput): Promise<place> {
    return this.PrismaService.place.create({ data });
  }
  async details(
    placeWhereUniqueInput: Prisma.placeWhereUniqueInput,
  ): Promise<place | null> {
    return this.PrismaService.place.findUnique({
      where: placeWhereUniqueInput,
      include: {
        users: true,
        city: true,
      },
    });
  }
  async getCityPlace(id: number): Promise<place[] | null> {
    return this.PrismaService.place.findMany({
      where: {},
    });
  }
  async Lists(): Promise<place[]> {
    return this.PrismaService.place.findMany({
      include: {
        travelEvent: true,
        vote: true,
        comment: true,
        city: true,
      },
    });
  }
  async update(params: {
    where: Prisma.placeWhereUniqueInput;
    data: Prisma.placeUpdateInput;
  }): Promise<place> {
    return this.PrismaService.place.update(params);
  }
  async delete(
    placeWhereUniqueInput: Prisma.placeWhereUniqueInput,
  ): Promise<place> {
    return this.PrismaService.place.delete({
      where: placeWhereUniqueInput,
    });
  }
}
