/* eslint-disable prettier/prettier */
import { Expose, Type } from 'class-transformer';
import { baseDTO, connectBase } from './base.dto';
export class voteDTO extends baseDTO {
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
}
