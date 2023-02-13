import { GeneralUser } from '../../general_user/entities/general_user.entity';
import { Request } from 'express';

export interface AuthRequest extends Request {
  user: GeneralUser;
}
