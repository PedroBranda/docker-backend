import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { Users } from "./user/user.entity";
import { UserController } from "./user/user.controller";
import { UserService } from "./user/user.service";
import { AuthService } from "./auth/auth.service";
import { AuthController } from "./auth/auth.controller";
import { JwtModule } from "@nestjs/jwt";
import { APP_GUARD } from "@nestjs/core";
import { AuthGuard } from "./auth/auth.guard";
import { ScheduleController } from "./schedule/schedule.controller";
import { ScheduleService } from "./schedule/schedule.service";
import { Schedules } from "./schedule/schedule.entity";
import { Locations } from "./location/location.entity";
import { LocationController } from "./location/location.controller";
import { LocationService } from "./location/location.service";
import { ScheduleModule } from "@nestjs/schedule";
import { TeamController } from "./team/team.controller";
import { Teams } from "./team/team.entity";
import { TeamService } from "./team/team.service";
import { TeamRepository } from "./team/team.repository";
import { ScheduleRepository } from "./schedule/schedule.repository";
import { UserRepository } from "./user/user.repository";
import { LocationRepository } from "./location/location.repository";
import { AcceptLanguageResolver, I18nModule, QueryResolver } from "nestjs-i18n";
import { join } from "path";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "postgres",
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [Users, Locations, Schedules, Teams],
      synchronize: true,
    }),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
    }),
    ScheduleModule.forRoot(),
    I18nModule.forRoot({
      fallbackLanguage: "en",
      fallbacks: {
        "en-*": "en",
        pt: "pt-BR",
      },
      loaderOptions: {
        path: join(__dirname, "/i18n/"),
        watch: true,
      },
      typesOutputPath: join(__dirname, "../src/generated/i18n.generated.ts"),
      resolvers: [
        { use: QueryResolver, options: ["lang"] },
        AcceptLanguageResolver,
      ],
    }),
    TypeOrmModule.forFeature([Users, Locations, Schedules, Teams]),
  ],
  controllers: [
    AppController,
    AuthController,
    UserController,
    LocationController,
    ScheduleController,
    TeamController,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    AppService,
    AuthService,
    UserService,
    UserRepository,
    LocationService,
    LocationRepository,
    ScheduleService,
    ScheduleRepository,
    TeamService,
    TeamRepository,
  ],
})
export class AppModule {}
