import { Type } from 'class-transformer';
import { AccountDto } from './account.dto';

export class OutAccountDto {
  @Type(() => AccountDto)
  user: AccountDto;
}
