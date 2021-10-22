export interface UserState {
  id: string | number;
  name: string;
  email: string;
  address?: string;
  phone?: number;
  gender?: string;
  birthday?: string;
}

export interface LoginState {
  token: string;
  user: UserState;
}

export interface RegisterState {
  name: string;
  email: string;
  password: string;
  phone: number;
}
