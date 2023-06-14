/* eslint-disable prettier/prettier */
import { Expose, Type, plainToClass } from 'class-transformer';
import { IsInt, IsNotEmpty } from 'class-validator';
export abstract class baseDTO {
  static plainToClass<T>(this: new (...arg: any[]) => T, obj: T): T {
    return plainToClass(this, obj, { excludeExtraneousValues: true });
  }
}
export abstract class connectBase {
  connect: { id: number };
}

export class idDTO {
  @IsInt()
  @Type(() => Number)
  @Expose()
  @IsNotEmpty()
  id: number;
}
