import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';
import { IsOptional } from 'class-validator';

export enum UserPermission {
  admin = 0,
  player = 1,
}

export enum DefaultUsers {
  admin = 0,
}

@Entity()
export class Users {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({
    type: 'enum',
    enum: UserPermission,
    default: UserPermission.player,
  })
  @IsOptional()
  permission?: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @CreateDateColumn()
  @IsOptional()
  createdAt?: Date;

  @UpdateDateColumn()
  @IsOptional()
  updatedAt?: Date;

  @DeleteDateColumn()
  @IsOptional()
  deletedAt?: Date;

  @Column({ default: DefaultUsers.admin })
  @IsOptional()
  createdBy?: number;

  @Column({ default: null })
  @IsOptional()
  updatedBy?: number;

  @Column({ default: null })
  @IsOptional()
  deletedBy?: number;
}
