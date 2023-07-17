import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { IsOptional } from 'class-validator';
import { DefaultUsers } from '../user/user.entity';
import { Point } from 'geojson';

export enum LocationTypes {
  user,
  schedule,
}

@Entity()
export class Locations {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({
    type: 'geography',
  })
  point: Point;

  @Column({ type: 'enum', enum: LocationTypes })
  locationType: number;

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
