import { Request } from 'express';
import { User } from '../../user/entities/user.entity';

export class AuthRequest extends Request {
  //Render burro pqp
  user: User;
}
