import { Column, Entity, JoinTable, ManyToMany, OneToOne } from "typeorm";
import { Users } from "../user/user.entity";
import { AbstractEntity } from "../common/abstract/abstract.entity";
import { Schedules } from "../schedule/schedule.entity";

@Entity()
export class Teams extends AbstractEntity {
  @Column()
  teamSizeLimit: number;

  // RELATIONS

  @ManyToMany(() => Users)
  @JoinTable({
    name: "team_user_pivot",
    joinColumn: {
      name: "teamId",
      referencedColumnName: "id",
    },
    inverseJoinColumn: {
      name: "userId",
      referencedColumnName: "id",
    },
  })
  users: Users[];

  @OneToOne(() => Schedules, (schedule) => schedule.team)
  schedule: Schedules;
}
