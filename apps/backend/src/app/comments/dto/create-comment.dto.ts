export class CreateCommentDto {
  _id?: string;
  author?: string;
  productId: string;
  dignities: string;
  disadvantage: string;
  comment: string;
  rating: number;
  date?: Date;
}
