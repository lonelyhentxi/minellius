import { Body, Controller, Get, HttpCode, HttpStatus, Inject, Logger, Post, Req } from '@nestjs/common';
import { ApiResponse, ApiUseTags } from '@nestjs/swagger';
import { OutAccountDto } from '../../role/dto/out-account.dto';
import { plainToClass } from 'class-transformer';
import { JsonWebTokenError } from 'jsonwebtoken';
import { RedirectUriDto } from '../dto/redirect-uri.dto';
import { SignInDto } from '../dto/sign-in.dto';
import { SignUpDto } from '../dto/sign-up.dto';
import { TokenDto } from '../dto/token.dto';
import { UserTokenDto } from '../dto/user-token.dto';
import { IJwtPayload } from '../interfaces/jwt-payload.interface';
import { AuthService } from '../services/auth.service';
import { TokenService } from '../services/token.service';
import { CORE_CONFIG_TOKEN, ICoreConfig } from '../../core';
import { GithubTokenDto } from '../dto/github-token.dto';
import { GithubSignInDto } from '../dto/github-signIn.dto';

@ApiUseTags('auth')
@Controller('/api/auth')
export class AuthController {
  constructor(
    @Inject(CORE_CONFIG_TOKEN) private readonly coreConfig: ICoreConfig,
    private readonly authService: AuthService,
    private readonly tokenService: TokenService,
  ) {
  }

  @HttpCode(HttpStatus.OK)
  @Post('signin')
  @ApiResponse({
    status: HttpStatus.OK,
    type: UserTokenDto,
    description: 'API View that checks the veracity of a token, returning the token if it is valid.',
  })
  async requestJsonWebTokenAfterSignIn(@Req() req, @Body() signInDto: SignInDto): Promise<UserTokenDto> {
    const token = await this.tokenService.create(req.user);
    return plainToClass(UserTokenDto, { user: req.user, token });
  }

  @HttpCode(HttpStatus.CREATED)
  @Post('signup')
  @ApiResponse({
    status: HttpStatus.OK,
    type: UserTokenDto,
    description: `API View that receives a POST with a user's username and password.
        Returns a JSON Web Token that can be used for authenticated requests.`,
  })
  async requestJsonWebTokenAfterSignUp(@Req() req, @Body() signUpDto: SignUpDto): Promise<UserTokenDto> {
    const token = await this.tokenService.create(req.user);
    return plainToClass(UserTokenDto, { user: req.user, token });
  }

  @HttpCode(HttpStatus.OK)
  @Post('info')
  @ApiResponse({
    status: HttpStatus.OK,
    type: UserTokenDto,
    description: 'API View that checks the veracity of a token, returning the token if it is valid.',
  })
  async requestJsonWebTokenAfterInfo(@Req() req, @Body() tokenDto: TokenDto): Promise<OutAccountDto> {
    try {
      const validateTokenResult = await this.tokenService.validate(tokenDto.token);
      if (validateTokenResult) {
        const jwtPayload: IJwtPayload = await this.tokenService.decode(tokenDto.token);
        const { user } = await this.authService.info({ id: jwtPayload.id });
        return plainToClass(OutAccountDto, { user });
      } else {
        throw new JsonWebTokenError('invalid token');
      }
    } catch (error) {
      throw error;
    }
  }

  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'github/uri',
  })
  @Get('github/uri')
  async requestGithubRedirectUrl(@Req() req): Promise<RedirectUriDto> {
    Logger.log(req.get('origin'), AuthController.name + ':requestGithubRedirectUrl#origin');
    return this.authService.requestGithubRedirectUri(
      req.get('origin') || this.coreConfig.protocol + '://' + req.get('host'),
    );
  }

  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Return app user token if valid',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Github server return valid user info',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Github account has bound no app account',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Github account auth failed',
  })
  @Post('github/signin')
  async githubSignIn(@Req() req, @Body() githubSignInDto: GithubSignInDto): Promise<UserTokenDto> {
    Logger.log(req.get('origin'), AuthController.name + ':githubSignIn#origin');
    const token = await this.authService.requestGithubToken(githubSignInDto.code);
    return await this.authService.githubSignIn(token);
  }

  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Return app user token if valid',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Github server return valid user info',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Github account has bound no app account',
  })
  @Post('github/token')
  async requestJsonWebTokenAfterGithubSignIn(
    @Req() req,
    @Body() githubTokenDto: GithubTokenDto,
  ): Promise<UserTokenDto> {
    const token = await this.tokenService.create(req.user);
    return plainToClass(UserTokenDto, { user: req.user, token });
  }
}
