/* eslint-disable prettier/prettier */
import { Expose, Type } from 'class-transformer';
import { IsEmail, IsInt, IsNotEmpty, IsNumberString, IsString } from 'class-validator';
import { baseDTO, connectBase } from './base.dto';
export class commentDTO extends baseDTO {
  @Type(() => Number)
  userID: number;

  @Expose()
  @Type(() => connectBase)
  users: any;


  @Type(() => Number)
  placeID: number;

  @Expose()
  @Type(() => connectBase)
  place: any;

  @IsString()
  @Expose()
  @IsNotEmpty()
  cmt: string;
}
