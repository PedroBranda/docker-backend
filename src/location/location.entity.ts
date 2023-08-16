import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  Index,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { IsOptional } from "class-validator";
import { DefaultUsers, Users } from "../user/user.entity";
import { Point } from "geojson";

export enum LocationTypes {
  user,
  schedule,
}

@Entity()
export class Locations {
  @PrimaryGeneratedColumn()
  id?: number;

  @Index({ spatial: true })
  @Column({
    type: "geography",
    srid: 4326,
    spatialFeatureType: "Point",
  })
  point: Point;

  @Column({ type: "enum", enum: LocationTypes })
  locationType: number;

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
