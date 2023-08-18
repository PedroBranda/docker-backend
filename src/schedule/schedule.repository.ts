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
    isOpen,
    startScheduleDate,
  }: {
    isOpen: boolean;
    startScheduleDate: string;
  }) {
    if (isOpen && startScheduleDate) {
      return And(
        MoreThan(new Date()),
        Between(
          startOfDay(new Date(startScheduleDate)),
          endOfDay(new Date(startScheduleDate))
        )
      );
    }

    if (isOpen && !startScheduleDate) {
      return MoreThan(new Date());
    }

    if (isOpen === false && startScheduleDate) {
      return And(
        LessThanOrEqual(new Date()),
        Between(
          startOfDay(new Date(startScheduleDate)),
          endOfDay(new Date(startScheduleDate))
        )
      );
    }

    if (isOpen === false && !startScheduleDate) {
      return LessThanOrEqual(new Date());
    }

    if (isOpen === undefined && startScheduleDate) {
      return Between(
        startOfDay(new Date(startScheduleDate)),
        endOfDay(new Date(startScheduleDate))
      );
    }

    return undefined;
  }
}
