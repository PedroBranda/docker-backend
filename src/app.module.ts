import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Users } from './user/user.entity';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'host.docker.internal',
      port: 5432,
      username: 'admin',
      password: 'admin',
      database: 'db',
      entities: [Users],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Users]),
  ],
  controllers: [AppController, UserController],
  providers: [AppService, UserService],
})
export class AppModule {}
