import { JwtAuthGuard } from './../guards/jwt-auth.guard';
import { CreateCommentDto } from './dto/create-comment.dto';
import { ResponseCommentDto } from './rdo/response.comment.dto';
import { fillObject } from '@guitar-shop/core';
import { CommentsService } from './comments.service';
import { ApiTags } from '@nestjs/swagger';
import { Controller, Get, Post, Param, Body, UseGuards, Req } from '@nestjs/common';
import { ExtendedUserRequest } from '@guitar-shop/shared-types';

@ApiTags('Comments')
@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Get('/:productId')
  async findComments(@Param('productId') id :string) {
    const commentList = await this.commentsService.findAll(id);
    return fillObject(ResponseCommentDto, commentList);
  }

  @UseGuards(JwtAuthGuard)
  @Post('/:productId')
  async createComment(@Body() commentDto: CreateCommentDto, @Param('productId') id: string, @Req() req: ExtendedUserRequest) {
    const newComment = await this.commentsService.create({...commentDto, productId: id, author: req.user.sub});
    return fillObject(ResponseCommentDto, newComment);
  }
}
