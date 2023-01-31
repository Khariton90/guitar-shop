import { User, UserRole } from "@guitar-shop/shared-types";
import { compare, genSalt, hash } from 'bcrypt';

export const SALT_ROUNDS = 10;

export class UsersEntity implements User {
  _id?: string;
  username: string;
  email: string;
  passwordHash: string;
  userRole: UserRole;
  
  constructor(user: User) {
    this.fillEntity(user);
  }

  public fillEntity(user: User) {
    this._id = user._id;
    this.username = user.username;
    this.email = user.email;
    this.passwordHash = user.passwordHash;
    this.userRole = user.userRole;
  }

  public toObject() {
    return {...this};
  }

  public async setPassword(password: string): Promise<UsersEntity> {
    const salt = await genSalt(SALT_ROUNDS);
    this.passwordHash = await hash(password, salt);
    return this;
  }

  public async comparePassword(password: string): Promise<boolean> {
    return compare(password, this.passwordHash);
  }
}