export interface Order {
  _id?: string;
  product: string;
  price: number;
  quantity: number;
  amountPrice: number;
  amountProduct: number;
  date: Date;
}