import { Expose, Transform,} from "class-transformer";

export class ResponseCommentDto {
  @Transform(({obj}) => obj._id.toString())
  @Expose({name: '_id'})
  public id: string;

  @Expose()
  @Transform(({obj}) => obj.author.username)
  public author!: string
  
  @Expose()
  public dignities: string;

  @Expose()
  public disadvantage: string;

  @Expose()
  public comment: string;

  @Expose()
  public rating: number;

  @Expose({name: 'createdAt'})
  public date: Date;
}
