/* eslint-disable prettier/prettier */
import { Expose, Type } from 'class-transformer';
import {
  IsEmail,
  IsInt,
  IsNotEmpty,
  IsNumberString,
  IsString,
} from 'class-validator';
import { baseDTO, connectBase } from './base.dto';
export class placeDTO extends baseDTO {
  @IsString()
  @Expose()
  @IsNotEmpty()
  name: string;

  @IsString()
  @Expose()
  @IsNotEmpty()
  description: string;

  @IsString()
  @Expose()
  @IsNotEmpty()
  address: string;

  @Expose()
  image: string;

  @Type(() => Number)
  userID: number;

  @Expose()
  @Type(() => connectBase)
  users: any;
  

  @Type(() => Number)
  cityID: number;

  @Expose()
  @Type(() => connectBase)
  city: any;
}
