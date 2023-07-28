import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { Schedules } from "./schedule.entity";

export class ScheduleRepository extends Repository<Schedules> {
  constructor(
    @InjectRepository(Schedules)
    private readonly repository: Repository<Schedules>
  ) {
    super(repository.target, repository.manager, repository.queryRunner);
  }
}
