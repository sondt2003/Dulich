/* eslint-disable prettier/prettier */
import { Expose, Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsString,
} from 'class-validator';
import { baseDTO, connectBase } from './base.dto';
export class travelEventDTO extends baseDTO {
  @Type(() => Number)
  placeID: number;

  @Expose()
  @Type(() => connectBase)
  place: any;

  @IsString()
  @Expose()
  @IsNotEmpty()
  event: string;


  @IsString()
  @Expose()
  @IsNotEmpty()
  description: string;

  @IsString()
  @Expose()
  @IsNotEmpty()
  dateStart: Date;


  @IsString()
  @Expose()
  @IsNotEmpty()
  dateEnd: Date;
}
