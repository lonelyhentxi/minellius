import { IGithubConfig } from '../interfaces/github-config.interface';

export const defaultGithubConfig: IGithubConfig = {
  login_dialog_uri: 'https://github.com/login/oauth/authorize',
  access_token_uri: 'https://github.com/login/oauth/access_token',
  client_id: '[need]',
  client_secret: '[need]',
  oauth_redirect_uri: '[need]',
  state: '{fbstate}',
};
export const GITHUB_CONFIG_TOKEN: string = 'GithubConfig';