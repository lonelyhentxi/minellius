export interface ICoreConfig {
  debug: boolean;
  name: string;
  description: string;
  title: string;
  port:number;
  externalPort?: number;
  swagger_path: string;
  protocol: 'http'|'https';
  domain: string;
  version: string;
  contact_email?:string;
  localDomain: string;
  localProtocol: 'http'|'https';
}
