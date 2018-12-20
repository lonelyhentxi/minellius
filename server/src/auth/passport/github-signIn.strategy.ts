import { BadRequestException, HttpException, HttpStatus, Inject, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { use } from 'passport';
import * as GithubTokenStrategy from 'passport-github-token';
import { AuthService } from '../services/auth.service';
import { OauthTokensAccesstokensService } from '../services/oauth-tokens-accesstokens.service';
import { GITHUB_CONFIG_TOKEN } from '../configs/github.config';
import { IGithubConfig } from '../interfaces/github-config.interface';

@Injectable()
export class GithubSignInStrategy {
  constructor(
    @Inject(GITHUB_CONFIG_TOKEN) private readonly ghConfig: IGithubConfig,
    private readonly oauthTokensAccesstokensService: OauthTokensAccesstokensService,
    private readonly authService: AuthService,
  ) {
    this.init();
  }

  private init(): void {
    use(
      'minellius-github-signin',
      new GithubTokenStrategy(
        {
          clientID: this.ghConfig.client_id,
          clientSecret: this.ghConfig.client_secret,
        },
        async (accessToken: string, refreshToken: string, profile: any, done) => {
          Logger.log(`Github user '${JSON.stringify(profile.username)}' try sign in`, GithubSignInStrategy.name);
          if (!profile.id) {
            done(new BadRequestException('OAuth profile empty'), null);
          }
          try {
            const { oauthTokensAccesstoken } = await this.oauthTokensAccesstokensService.findByProviderAndClientId({
              id: profile.id, provider: 'github',
            });
            const { user } = await this.authService.info({
              id: oauthTokensAccesstoken.user.id,
            });
            done(null, user);
          } catch (err) {
            done(new NotFoundException('Client have no bound app account'), null);
          }
        },
      ),
    );
  }
}
