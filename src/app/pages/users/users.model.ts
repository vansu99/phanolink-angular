export interface User {
  id: number | string;
  name: string;
  phone: number;
  gender?: string;
  address?: string;
  email: string;
}

export interface OrderState {
  date_buy: string;
  id: number | string;
  products: string;
  total_price: number;
  status: string
}
