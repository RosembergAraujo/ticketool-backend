export interface UserPayload {
  sub: string;
  email: string;
  name: string;
  cpfCnpj: string;
  role: string;
  iat?: number;
  exp?: number;
}
