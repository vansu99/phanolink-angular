export interface ProductState {
  id: string | number;
  name: string;
  description: string;
  discount?: number;
  original_price: number;
  is_free_shipping: boolean;
  category_id: string;
  is_gift: boolean;
  is_hot: boolean;
  img_path: string;
  quantity?: number;
}
