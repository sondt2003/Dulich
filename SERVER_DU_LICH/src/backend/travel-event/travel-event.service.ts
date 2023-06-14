import { Prisma, travelEvent } from '@prisma/client';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TravelEventService {
  constructor(private PrismaService: PrismaService) {}
  async create(data: Prisma.travelEventCreateInput): Promise<travelEvent> {
    return this.PrismaService.travelEvent.create({ data });
  }
  async details(
    travelEventWhereUniqueInput: Prisma.travelEventWhereUniqueInput,
  ): Promise<travelEvent | null> {
    return this.PrismaService.travelEvent.findUnique({
      where: travelEventWhereUniqueInput,
    });
  }
  async detailsTravelEventPlace(id: number): Promise<travelEvent[]> {
    return this.PrismaService.travelEvent.findMany({
      where: { placeID: id },
    });
  }
  async Lists(): Promise<travelEvent[]> {
    return this.PrismaService.travelEvent.findMany({
      include: {
        place: true,
      },
    });
  }
  async update(params: {
    where: Prisma.travelEventWhereUniqueInput;
    data: Prisma.travelEventUpdateInput;
  }): Promise<travelEvent> {
    return this.PrismaService.travelEvent.update(params);
  }
  async delete(
    travelEventWhereUniqueInput: Prisma.travelEventWhereUniqueInput,
  ): Promise<travelEvent> {
    return this.PrismaService.travelEvent.delete({
      where: travelEventWhereUniqueInput,
    });
  }
}
