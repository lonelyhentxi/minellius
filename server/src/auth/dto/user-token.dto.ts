import { ApiModelProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { AccountDto } from '../../role';

export class UserTokenDto {
  @ApiModelProperty()
  token: string;

  @Type(() => AccountDto)
  @ApiModelProperty({ type: AccountDto })
  user: AccountDto;
}
