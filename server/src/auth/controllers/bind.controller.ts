import { Body, Controller, Get, HttpCode, HttpStatus, Inject, Logger, Post, Req, UseGuards } from '@nestjs/common';
import { ApiResponse, ApiUseTags, ApiBearerAuth } from '@nestjs/swagger';
import { AuthService } from '../services/auth.service';
import { TokenService } from '../services/token.service';
import { CORE_CONFIG_TOKEN, ICoreConfig } from '../../core';
import { GithubTokenDto } from '../dto/github-token.dto';
import { AccessGuard, Roles } from '../../role';
import { plainToClass } from 'class-transformer';
import { UserTokenDto } from '..';
import { GithubSignInDto } from '../dto/github-signIn.dto';
import { OauthTokensAccesstokensService } from '../services/oauth-tokens-accesstokens.service';
import { OauthTokensAccesstoken } from '../entities/oauth-tokens-accesstoken.entity';

@ApiUseTags('bind')
@Controller('/api/bind')
@UseGuards(AccessGuard)
export class BindController {
  constructor(
    @Inject(CORE_CONFIG_TOKEN) private readonly coreConfig: ICoreConfig,
    private readonly authService: AuthService,
    private readonly tokenService: TokenService,
  ) {
  }

  @HttpCode(HttpStatus.OK)
  @Roles('isActive')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Github account and app account bound',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Github server return valid user info',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Github account auth failed',
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: 'Github account or app account have bound',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Unauthorized',
  })
  @Post('github')
  async githubBind(@Req() req, @Body() githubSignInDto: GithubSignInDto): Promise<UserTokenDto> {
    const token = this.tokenService.extractTokenFromRequest(req);
    Logger.log(req.get('origin'), BindController.name + ':githubBind#origin');
    const oauthAccessToken = await this.authService.requestGithubToken(githubSignInDto.code);
    return await this.authService.githubBind(token, oauthAccessToken);
  }

  @ApiBearerAuth()
  @Roles('isActive')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Github account and app account bound',
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: 'Github account or app account have bound',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Github server return valid user info',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Unauthorized',
  })
  @Post('github/token')
  async requestJsonWebTokenAfterGithubBind(
    @Req() req,
    @Body() githubTokenDto: GithubTokenDto,
  ): Promise<UserTokenDto> {
    Logger.log(req.get('origin'), BindController.name + ':requestJsonWebTokenAfterGithubBin#origin');
    await this.authService.joinAfterGithubBind(githubTokenDto, req.user, req.profile);
    const token = await this.tokenService.create(req.user);
    return plainToClass(UserTokenDto, { user: req.user, token });
  }

  @ApiBearerAuth()
  @Roles('isActive')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Return oauth list',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Unauthorized',
  })
  @Roles('isActive')
  @Get('accounts')
  async findAllOauthAccounts(
    @Req() req,
  ): Promise<OauthTokensAccesstoken[]> {
    Logger.log(req.get('origin'), BindController.name + ':findAllOauthAccounts#origin');
    return this.authService.oauthList(req.user);
  }
}
