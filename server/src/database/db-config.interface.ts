export interface IDbConfig {
  username: string;
  password: string;
  host: string;
  port: number;
  type: string | any;
  database: string;
  synchronize: boolean;
  logging: boolean;
  entities: string[];
}