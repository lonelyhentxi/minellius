import { BadRequestException, ConflictException, Inject, Injectable, Logger } from '@nestjs/common';
import { use } from 'passport';
import * as GithubTokenStrategy from 'passport-github-token';
import { AuthService } from '../services/auth.service';
import { OauthTokensAccesstokensService } from '../services/oauth-tokens-accesstokens.service';
import { GITHUB_CONFIG_TOKEN } from '../configs/github.config';
import { IGithubConfig } from '../interfaces/github-config.interface';

@Injectable()
export class GithubBindStrategy {
  constructor(
    @Inject(GITHUB_CONFIG_TOKEN) private readonly ghConfig: IGithubConfig,
    private readonly oauthTokensAccesstokensService: OauthTokensAccesstokensService,
    private readonly authService: AuthService,
  ) {
    this.init();
  }

  private init(): void {
    use(
      'minellius-github-bind',
      new GithubTokenStrategy(
        {
          clientID: this.ghConfig.client_id,
          clientSecret: this.ghConfig.client_secret,
          passReqToCallback: true,
        },
        async (req, accessToken: string, refreshToken: string, profile: any, done) => {
          Logger.log(`Github user '${JSON.stringify(profile.username)}' try bind`, GithubBindStrategy.name);
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
            const err = new ConflictException('Users have been bound');
            done(err, true);
          } catch (err) {
            req.profile = profile;
            done(null, true);
          }
        },
      ),
    );
  }
}
