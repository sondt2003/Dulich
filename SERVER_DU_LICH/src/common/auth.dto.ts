/* eslint-disable prettier/prettier */
import { Expose } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { baseDTO } from './base.dto';

export class authDTO extends baseDTO {
  @IsNotEmpty()
  @IsString()
  @Expose()
  account: string;


  @IsEmail()
  @IsNotEmpty()
  @IsString()
  @Expose()
  email: string;

  @IsNotEmpty()
  @IsString()
  @Expose()
  password: string;

 
  @Expose()
  remember_token: string;
}
