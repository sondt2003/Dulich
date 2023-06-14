/* eslint-disable prettier/prettier */
import { Expose, Type } from 'class-transformer';
import { IsBoolean, IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { baseDTO } from './base.dto';
export class userDTO extends baseDTO {
  @Expose()
  role: string;

  @Expose()
  @Type(() => Boolean)
  active: boolean;

  @IsEmail()
  @Expose()
  @IsNotEmpty()
  email: string;

  @IsString()
  @Expose()
  @IsNotEmpty()
  account: string;

  @IsString()
  @Expose()
  @IsNotEmpty()
  fullname: string;

  @Expose()
  password: string;

  @Expose()
  remember_token: string;
}
