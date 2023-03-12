import { compare, hash } from 'bcrypt';
import { SALT_ROUNDS } from 'src/constants/app.constants';

export async function createPasswordHashed(password: string): Promise<string> {
  return await hash(password, SALT_ROUNDS);
}

export async function validateHashedPassword(
  password: string,
  passwordHashed: string,
): Promise<boolean> {
  return await compare(password, passwordHashed);
}
