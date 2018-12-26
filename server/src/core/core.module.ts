import { Module, Provider } from '@nestjs/common';
import { configs } from './configs';

@Module({
  providers: [...configs],
  exports: [...configs],
})

export class CoreModule {
  static forRoot(options: { providers: Provider[] }) {
    return {
      module: CoreModule,
      providers: [...configs, ...options.providers],
      exports: [...configs],
    };
  }
}