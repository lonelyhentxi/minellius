import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
      TypeOrmModule.forRoot({
          name: "dataConnection",
          type: 'mysql',
          host: '127.0.0.1',
          port: 3306,
          username: 'root',
          password:  '',
          database: 'minellius',
          entities: [__dirname + '/**/*.entity{.ts,.js}'],
          synchronize: true,
      }),
  ],
})
export class AppModule {
}
