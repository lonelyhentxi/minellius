import { ApiModelProperty } from '@nestjs/swagger';
import {  IsNotEmpty } from 'class-validator';

export class GithubSignInDto {
  @IsNotEmpty()
  @ApiModelProperty()
  code: string;
}