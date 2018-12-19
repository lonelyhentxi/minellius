import { FacebookStrategy } from './facebook.strategy';
import { MinelliusJwtStrategy } from './jwt.strategy';
import { LocalStrategySignIn, LocalStrategySignUp } from './local.strategy';

export const passportStrategies = [
  LocalStrategySignIn,
  LocalStrategySignUp,
  MinelliusJwtStrategy,
  FacebookStrategy,
];
