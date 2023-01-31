import { UserRole } from './user-role.enum';

export interface User {
  _id?: string;
  username: string;
  email: string;
  passwordHash: string;
  userRole: UserRole;
}