import { UserRole } from "@guitar-shop/shared-types";

export interface UserDto {
  id: string,
  email: string,
  userRole: UserRole,
  username: string,
  token: string,
}
