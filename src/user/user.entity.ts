import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from "typeorm";
import { IsOptional } from "class-validator";

export enum UserPermissions {
  admin,
  player,
}

export enum DefaultUsers {
  admin,
}

export enum DocumentTypes {
  rg,
  cpf,
}

export enum UserGenders {
  male,
  female,
  other,
}

@Entity()
export class Users {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column("int", { array: true, default: [UserPermissions.player] })
  @IsOptional()
  permissions?: number[];

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ type: "enum", enum: UserGenders })
  gender: number;

  @Column()
  birthDate: Date;

  @Column()
  document: string;

  @Column({ type: "enum", enum: DocumentTypes })
  documentType: number;

  @Column()
  email: string;

  @Column()
  phone: string;

  @Column()
  password: string;

  @CreateDateColumn({ type: "timestamp" })
  @IsOptional()
  createdAt?: Date;

  @UpdateDateColumn({ type: "timestamp" })
  @IsOptional()
  updatedAt?: Date;

  @DeleteDateColumn({ type: "timestamp" })
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
