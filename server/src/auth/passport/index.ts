import { MinelliusJwtStrategy } from './jwt.strategy';
import { LocalStrategySignIn, LocalStrategySignUp } from './local.strategy';
import { GithubSignInStrategy } from './github-signIn.strategy';
import { GithubBindStrategy } from './github-bind.strategy';

export const passportStrategies = [
  LocalStrategySignIn,
  LocalStrategySignUp,
  MinelliusJwtStrategy,
  GithubSignInStrategy,
  GithubBindStrategy,
];
