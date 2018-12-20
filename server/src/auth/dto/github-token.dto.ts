import { ApiModelProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class GithubTokenDto {
  @IsNotEmpty()
  @ApiModelProperty()
  access_token: string;
}
