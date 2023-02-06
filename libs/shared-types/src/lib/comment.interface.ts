import { User } from './user.interface';

export interface Comment {
  _id?: string;
  author: string;
  dignities: string;
  disadvantage: string;
  comment: string;
  rating: number;
  date: Date;
}