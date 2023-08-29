import { Column, Entity } from "typeorm";
import { IsOptional } from "class-validator";
import { AbstractEntity } from "../common/abstract/abstract.entity";

export enum UserPermissions {
  admin = 1,
  player = 2,
}

export enum DocumentTypes {
  rg = 1,
  cpf = 2,
}

export enum UserGenders {
  male = 1,
  female = 2,
  other = 3,
}

@Entity()
export class Users extends AbstractEntity {
  @Column("int", { array: true, default: [UserPermissions.player] })
  @IsOptional()
  permissions?: number[];

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ type: "enum", enum: UserGenders })
  gender: number;

  @Column({ type: "timestamptz" })
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
}
