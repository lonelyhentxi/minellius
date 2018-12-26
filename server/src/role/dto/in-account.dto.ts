import { ApiModelProperty, ApiModelPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsOptional, MaxLength } from 'class-validator';

export class InAccountDto {
  @IsOptional()
  id: number;

  @MaxLength(128)
  @ApiModelProperty()
  currentPassword: string;

  @IsEmail()
  @MaxLength(254)
  @IsOptional()
  @ApiModelPropertyOptional()
  email?: string;

  @MaxLength(128)
  @IsOptional()
  @ApiModelPropertyOptional()
  password?: string;

  @MaxLength(150)
  @IsOptional()
  @ApiModelPropertyOptional()
  username?: string;
}
