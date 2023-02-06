import { CommentsRepository } from './comments.repository';
import { Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UsersService } from '../users/users.service';

@Injectable()
export class CommentsService {
  constructor(
    private readonly commentsRepository: CommentsRepository,
    private readonly usersService: UsersService,
    ) {}

  public async findAll(id: string) {
    const comments = await this.commentsRepository.find(id);
    return comments;
  }

  public async create(commentDto: CreateCommentDto) {
    const comment = await this.commentsRepository.create(commentDto);
    return comment;
  }
}
