import {UserDto} from './user.dto';
import {IsNotEmpty, IsOptional, MaxLength} from 'class-validator';

export class OauthTokensAccesstoken {
  id: number;

  @IsNotEmpty()
  @MaxLength(20)
  provider: string ;

  @IsNotEmpty()
  @MaxLength(200)
  providerClientId: string;

  grantedAt: Date;

  @MaxLength(500)
  accessToken?: string;

  @IsOptional()
  refreshToken?: string;

  @IsOptional()
  tokenType?: string;

  @IsOptional()
  scope?: string;

  user: UserDto;
}
