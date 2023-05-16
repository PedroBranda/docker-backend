import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Users } from './user/entity/users.entity';
import { UsersController } from './user/users.controller';
import { UsersService } from './user/users.service';

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
  controllers: [AppController, UsersController],
  providers: [AppService, UsersService],
})
export class AppModule {}
