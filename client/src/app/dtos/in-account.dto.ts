import { IsEmail, IsOptional, MaxLength } from 'class-validator';

export class InAccountDto {
  @IsOptional()
  id?: number;

  @MaxLength(128)
  currentPassword: string;

  @IsEmail()
  @MaxLength(254)
  @IsOptional()
  email?: string;

  @MaxLength(128)
  @IsOptional()
  password?: string;

  @MaxLength(150)
  @IsOptional()
  username?: string;
}
