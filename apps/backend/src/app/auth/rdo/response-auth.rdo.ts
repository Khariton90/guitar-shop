import { Expose } from "class-transformer";

export class ResponseAuthRdo {
  @Expose()
  id: string;

  @Expose()
  userRole: string;

  @Expose()
  email: string;

  @Expose()
  username: string;

  @Expose()
  token: string;
}