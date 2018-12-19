import { CORE_CONFIG_TOKEN, defaultCoreConfig } from './core.config';

export const configs = [{provide:CORE_CONFIG_TOKEN,useValue:defaultCoreConfig}];

export { defaultCoreConfig, CORE_CONFIG_TOKEN } from './core.config';