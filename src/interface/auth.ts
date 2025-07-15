export interface PLogin {
  username: string;
  password: string;
}

export interface PRegister {
  first_name: string;
  last_name: string;
  username: string;
  phone: string;
  address: string;
  password_hash: string;
  role_id: number;
}
