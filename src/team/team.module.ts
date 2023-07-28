import { Module } from "@nestjs/common";
import { TeamController } from "./team.controller";
import { TeamService } from "./team.service";

@Module({
  imports: [],
  exports: [],
  controllers: [TeamController],
  providers: [TeamService],
})
export class TeamModule {}
