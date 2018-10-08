import { DynamicModule, Module, Provider } from '@nestjs/common';
import { configs } from './configs';

@Module({
  imports: [],
  controllers: [],
  providers: [...configs],
  exports: [...configs],
})
export class CoreModule {
  static forFeature(): DynamicModule {
    return {
      module: CoreModule,
      providers: [...configs],
      exports: [...configs],
    };
  }

  static forRoot(options: { providers: Provider[] }): DynamicModule {
    return {
      module: CoreModule,
      providers: [...configs, ...options.providers],
      exports: [...configs],
    };
  }
}
