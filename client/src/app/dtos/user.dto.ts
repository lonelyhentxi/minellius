import {Exclude, Type} from 'class-transformer';
import {MaxLength} from 'class-validator';
import {GroupDto} from './group.dto';

export class UserDto {
  id: number;
  @Exclude()
  @MaxLength(128)
  password: string;
  lastLogin: Date;
  isSuperuser: boolean;
  @MaxLength(150)
  username: string;
  @MaxLength(254)
  email: string;
  isStaff: boolean;
  isActive: boolean;
  dateJoined: Date;
  dateOfBirth: Date;
  @Type(() => GroupDto)
  groups: GroupDto[];
}
