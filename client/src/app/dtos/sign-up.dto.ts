import { IsEmail, IsNotEmpty, MaxLength } from 'class-validator';

export class SignUpDto {
  @IsNotEmpty()
  @IsEmail()
  @MaxLength(150)
  email: string;

  @IsNotEmpty()
  @MaxLength(150)
  username: string;

  @IsNotEmpty()
  @MaxLength(128)
  password: string;
}
