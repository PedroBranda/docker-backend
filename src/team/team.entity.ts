import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Users } from "../user/user.entity";
import { AbstractEntity } from "../abstract/abstract.entity";

@Entity()
export class Teams extends AbstractEntity {
  @Column()
  teamSizeLimit: number;

  @ManyToMany(() => Users, {
    cascade: true,
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
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
}
