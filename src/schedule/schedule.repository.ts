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
    open,
    startScheduleDate,
  }: {
    open: boolean;
    startScheduleDate: string;
  }) {
    if (open && startScheduleDate) {
      console.log(1);
      return And(
        MoreThan(new Date()),
        Between(
          startOfDay(new Date(startScheduleDate)),
          endOfDay(new Date(startScheduleDate))
        )
      );
    }

    if (open && !startScheduleDate) {
      console.log(2);
      return MoreThan(new Date());
    }

    if (!open && startScheduleDate) {
      console.log(3);
      return And(
        LessThanOrEqual(new Date()),
        Between(
          startOfDay(new Date(startScheduleDate)),
          endOfDay(new Date(startScheduleDate))
        )
      );
    }

    if (!open && open !== undefined) {
      console.log(4);
      return LessThanOrEqual(new Date());
    }

    console.log(5);
    return undefined;
  }
}
