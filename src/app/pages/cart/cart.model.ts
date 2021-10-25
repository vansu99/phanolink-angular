export interface CartState {
  id: string | number;
  title: string;
  price: number;
  discount?: number;
  original_price: number;
  discountPrice?:number;
  thumbnail: string;
  quantity: number
}
