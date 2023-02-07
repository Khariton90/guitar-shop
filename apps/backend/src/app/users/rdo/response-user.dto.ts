import { Expose, Transform } from 'class-transformer';

export class ResponseUserDto {
  @Transform(({obj}) => obj._id.toString())
  @Expose({name: '_id'})
  id: string;

  @Expose()
  username: string;

  @Expose()
  email: string;

  @Expose()
  userRole: string;

  @Expose()
  token?: string;
}