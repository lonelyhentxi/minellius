import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {ConfigModule} from "./configs";

@Module({
  imports: [
      ConfigModule,
      TypeOrmModule.forRoot({
          type: 'mysql',
          host: process.env.NODE_ENV === "production"? '10.10.4.6':"127.0.0.1",
          port: 3306,
          username: 'root',
          password:  'minellius2018+-',
          database: 'minellius',
          entities: [__dirname + '/**/*.entity{.ts,.js}'],
          synchronize: true,
      }),
  ],
})
export class AppModule {
}
