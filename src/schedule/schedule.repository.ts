import { And, Between, LessThanOrEqual, MoreThan, Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { Schedules } from "./schedule.entity";
import { endOfDay, startOfDay } from "date-fns";

export class ScheduleRepository extends Repository<Schedules> {
  constructor(
    @InjectRepository(Schedules)
    private readonly repository: Repository<Schedules>
  ) {
    super(repository.target, repository.manager, repository.queryRunner);
  }

  createStartScheduleDateFilter({
    opened,
    startScheduleDate,
  }: {
    opened: boolean;
    startScheduleDate: string;
  }) {
    if (opened && startScheduleDate) {
      return And(
        MoreThan(new Date()),
        Between(
          startOfDay(new Date(startScheduleDate)),
          endOfDay(new Date(startScheduleDate))
        )
      );
    }

    if (opened && !startScheduleDate) {
      return MoreThan(new Date());
    }

    if (!opened && startScheduleDate) {
      return And(
        LessThanOrEqual(new Date()),
        Between(
          startOfDay(new Date(startScheduleDate)),
          endOfDay(new Date(startScheduleDate))
        )
      );
    }

    return undefined;
  }
}
