import { UserRole } from "@guitar-shop/shared-types";

export interface UserDto {
  userId: string,
  email: string,
  userRole: UserRole,
  username: string,
  token: string,
}
