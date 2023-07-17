import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { IsOptional } from 'class-validator';
import { DefaultUsers } from '../user/user.entity';
import { Locations } from '../location/location.entity';

export enum SportTypes {
  soccer,
  volleyball,
  basketball,
  football,
}

export enum SportModalities {
  fieldSoccer,
  swissSoccer,
  indoorSoccer,
}

export enum TeamSizes {
  full,
  half,
}

export enum SchedulePeriods {
  oneHour = 1,
  twoHour = 2,
}

@Entity()
export class Schedules {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ type: 'enum', enum: SportTypes })
  sportType: number;

  @Column({ type: 'enum', enum: SportModalities, default: null })
  @IsOptional()
  sportModality?: number;

  @Column({ type: 'enum', enum: TeamSizes, default: TeamSizes.full })
  @IsOptional()
  teamSize?: number;

  @Column()
  scheduleDate: Date;

  @OneToOne(() => Locations, { cascade: true })
  @JoinColumn()
  location: Locations;

  @Column({
    type: 'enum',
    enum: SchedulePeriods,
    default: SchedulePeriods.oneHour,
  })
  period?: number;

  @CreateDateColumn({ type: 'timestamp' })
  @IsOptional()
  createdAt?: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  @IsOptional()
  updatedAt?: Date;

  @DeleteDateColumn({ type: 'timestamp' })
  @IsOptional()
  deletedAt?: Date;

  @Column({ default: DefaultUsers.admin })
  @IsOptional()
  createdBy?: number;

  @Column({ default: DefaultUsers.admin })
  @IsOptional()
  updatedBy?: number;

  @Column({ default: null })
  @IsOptional()
  deletedBy?: number;
}
