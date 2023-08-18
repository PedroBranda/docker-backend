import { Injectable } from "@nestjs/common";
import { TeamRepository } from "./team.repository";

@Injectable()
export class TeamService {
  constructor(private readonly repository: TeamRepository) {}
}
