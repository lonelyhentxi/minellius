import { Type } from 'class-transformer';
import { AccountDto } from './account.dto';

export class UserTokenDto {
  token: string;

  @Type(() => AccountDto)
  user: AccountDto;
}
