import { ApiModelProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, MaxLength, IsOptional } from 'class-validator';

export class SignUpDto {
  @IsNotEmpty()
  @IsEmail()
  @MaxLength(150)
  @ApiModelProperty()
  email: string;

  @IsNotEmpty()
  @MaxLength(150)
  @ApiModelProperty()
  username: string;

  @IsNotEmpty()
  @MaxLength(128)
  @ApiModelProperty()
  password: string;
}
