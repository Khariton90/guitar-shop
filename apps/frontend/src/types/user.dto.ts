import { UserRole } from "@guitar-shop/shared-types";

export interface UserDto {
  username: string;
  email: string;
  password: string;
  userRole: UserRole;
}
