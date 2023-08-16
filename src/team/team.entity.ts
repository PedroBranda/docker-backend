import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { IsOptional } from "class-validator";
import { DefaultUsers, Users } from "../user/user.entity";

@Entity()
export class Teams {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  teamSizeLimit: number;

  @ManyToMany(() => Users, {
    cascade: true,
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinTable({
    name: "team_user",
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
