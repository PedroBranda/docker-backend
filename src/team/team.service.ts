import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Teams } from "./team.entity";
import { TeamRepository } from "./team.repository";
import { Repository } from "typeorm";

@Injectable()
export class TeamService {
  constructor(private readonly repository: TeamRepository) {}
}
