import { Type } from 'class-transformer';
import { MaxLength } from 'class-validator';
import { PermissionDto } from './permission.dto';

export class GroupWithPermissionsDto {
  id: number;
  @MaxLength(100)
  name: string;
  @MaxLength(255)
  title: string;
  @Type(() => PermissionDto)
  permissions: PermissionDto[];
}
