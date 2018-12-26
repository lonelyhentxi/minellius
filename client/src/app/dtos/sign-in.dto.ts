import { IsNotEmpty, MaxLength } from 'class-validator';

export class SignInDto {
  @IsNotEmpty()
  @MaxLength(150)
  email: string;

  @IsNotEmpty()
  @MaxLength(128)
  password: string;
}
