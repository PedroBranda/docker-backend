import { Column, Entity } from "typeorm";
import { IsOptional } from "class-validator";
import { AbstractEntity } from "../common/abstract/abstract.entity";

export enum UserPermissions {
  admin,
  player,
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
