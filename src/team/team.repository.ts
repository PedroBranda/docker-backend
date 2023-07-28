import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { Teams } from "./team.entity";

export class TeamRepository extends Repository<Teams> {
  constructor(
    @InjectRepository(Teams)
    private readonly repository: Repository<Teams>
  ) {
    super(repository.target, repository.manager, repository.queryRunner);
  }
}
