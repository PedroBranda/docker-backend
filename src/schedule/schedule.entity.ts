import { Column, Entity, JoinColumn, OneToOne } from "typeorm";
import { Locations } from "../location/location.entity";
import { Teams } from "../team/team.entity";
import { AbstractEntity } from "../common/abstract/abstract.entity";

export enum SportTypes {
  soccer = 1,
}

export enum SportModalities {
  fieldSoccer = 1,
  swissSoccer = 2,
  indoorSoccer = 3,
}

export enum SchedulePeriods {
  oneHour = 1,
  twoHour = 2,
}

@Entity()
export class Schedules extends AbstractEntity {
  @Column({ type: "enum", enum: SportTypes })
  sportType: number;

  @Column({ type: "enum", enum: SportModalities })
  sportModality: number;

  @Column({ type: "timestamptz" })
  startScheduleDate: Date;

  @Column({ type: "timestamptz" })
  endScheduleDate: Date;

  @Column({
    type: "enum",
    enum: SchedulePeriods,
    default: SchedulePeriods.oneHour,
  })
  period: number;

  // RELATIONS

  @OneToOne(() => Locations, (location) => location.schedule, { cascade: true })
  @JoinColumn()
  location: Locations;

  @OneToOne(() => Teams, (team) => team.schedule, { cascade: true })
  @JoinColumn()
  team: Teams;
}
