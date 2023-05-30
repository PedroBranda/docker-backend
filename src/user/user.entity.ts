import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { IsOptional } from 'class-validator';

export enum UserPermissionLevel {
  admin = 0,
  player = 1,
}

@Entity()
export class Users {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  @IsOptional()
  permissionLevel?: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  email: string;

  @Column()
  password: string;
}
