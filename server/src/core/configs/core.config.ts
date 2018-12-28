import { ICoreConfig } from '..';

export const defaultCoreConfig: ICoreConfig = {
  debug: true,
  name: '[package]',
  description: '[package]',
  title: '[package]',
  port: 6080,
  swagger_path: '[env]',
  protocol: 'http',
  domain: 'localhost',
  version: '[package]',
  contact_email:'[package]',
  localDomain: '[env]',
  localProtocol: 'http',
};
export const CORE_CONFIG_TOKEN: string = 'CoreConfig';