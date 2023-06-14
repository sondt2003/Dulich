/* eslint-disable prettier/prettier */
import { Expose, Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsString,
} from 'class-validator';
import { baseDTO, connectBase } from './base.dto';
export class cityDTO extends baseDTO {
  @IsString()
  @Expose()
  @IsNotEmpty()
  name: string;

  @Type(() => Number)
  userID: number;

  @Expose()
  @Type(() => connectBase)
  users: any;
}
