import { CommentsModel } from './comments.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose'
import { CreateCommentDto } from './dto/create-comment.dto';
import { Comment } from '@guitar-shop/shared-types';
import { UserModel } from '../users/users.model';
import dayjs from 'dayjs';

const DEFAULT_COMMENTS_LIMIT = 3;

export class CommentsRepository {
  constructor(
    @InjectModel(CommentsModel.name) private readonly commentsModel: Model<CommentsModel>,
    @InjectModel(UserModel.name) private readonly usersModel: Model<UserModel>,
  ) {}

  public async find(id: string) {
    return await this.commentsModel.find({productId: id})
    .populate({ path: 'author', select: 'username -_id', model: this.usersModel}).sort({'createdAt': -1}).limit(DEFAULT_COMMENTS_LIMIT)
    .exec();
  }

  public async create(comment: CreateCommentDto): Promise<Comment> {
    const date = dayjs(new Date());
    const newComment = new this.commentsModel({...comment, date: date});
    return newComment.save();
  }
}