import { ApiModelProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { MetaDto } from '../../core/dto/meta.dto';
import { PermissionDto } from './permission.dto';

export class OutPermissionsDto {
  @Type(() => PermissionDto)
  @ApiModelProperty({ type: PermissionDto, isArray: true })
  permissions: PermissionDto[];
  @Type(() => MetaDto)
  @ApiModelProperty({ type: MetaDto })
  meta: MetaDto;
}
