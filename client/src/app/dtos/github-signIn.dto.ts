import {  IsNotEmpty } from 'class-validator';

export class GithubSignInDto {
  @IsNotEmpty()
  code: string;
}
