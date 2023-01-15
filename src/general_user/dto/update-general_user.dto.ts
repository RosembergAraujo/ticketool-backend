import { PartialType } from '@nestjs/mapped-types';
import { CreateGeneralUserDto } from './create-general_user.dto';

export class UpdateGeneralUserDto extends PartialType(CreateGeneralUserDto) {}
