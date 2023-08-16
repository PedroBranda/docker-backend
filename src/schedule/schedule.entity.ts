import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { IsOptional } from "class-validator";
import { DefaultUsers, Users } from "../user/user.entity";
import { Locations } from "../location/location.entity";
import { Teams } from "../team/team.entity";

export enum SportTypes {
  soccer,
}

export enum SportModalities {
  fieldSoccer,
  swissSoccer,
  indoorSoccer,
}

export enum SchedulePeriods {
  oneHour = 1,
  twoHour = 2,
}

@Entity()
export class Schedules {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ type: "enum", enum: SportTypes })
  sportType: number;

  @Column({ type: "enum", enum: SportModalities, default: null })
  @IsOptional()
  sportModality?: number;

  @Column({ type: "timestamptz" })
  startScheduleDate: Date;

  @Column({ type: "timestamptz" })
  endScheduleDate: Date;

  @OneToOne(() => Locations, (location) => location.id, {
    cascade: true,
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn()
  location: Locations;

  @OneToOne(() => Teams, (team) => team.id, {
    cascade: true,
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn({ name: "id", referencedColumnName: "id" })
  team: Teams;

  @Column({
    type: "enum",
    enum: SchedulePeriods,
    default: SchedulePeriods.oneHour,
  })
  period?: number;

  @CreateDateColumn({ type: "timestamptz" })
  @IsOptional()
  createdAt?: Date;

  @UpdateDateColumn({ type: "timestamptz" })
  @IsOptional()
  updatedAt?: Date;

  @DeleteDateColumn({ type: "timestamptz" })
  @IsOptional()
  deletedAt?: Date;

  @Column({ default: DefaultUsers.admin })
  @IsOptional()
  createdBy?: number;

  @ManyToOne(() => Users)
  @JoinColumn({ name: "createdBy" })
  creator: Users;

  @Column({ default: DefaultUsers.admin })
  @IsOptional()
  updatedBy?: number;

  @Column({ default: null })
  @IsOptional()
  deletedBy?: number;
}
