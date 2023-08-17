import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Users } from "../user/user.entity";

export abstract class AbstractEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn({ type: "timestamptz" })
  createdAt: Date;

  @UpdateDateColumn({ type: "timestamptz" })
  updatedAt: Date;

  @DeleteDateColumn({ type: "timestamptz" })
  deletedAt: Date;

  @Column({ default: null })
  createdBy: number;

  @Column({ default: null })
  updatedBy: number;

  @Column({ default: null })
  deletedBy: number;

  // RELATIONS

  @ManyToOne(() => Users)
  @JoinColumn({ name: "createdBy" })
  creator: Users;

  @ManyToOne(() => Users)
  @JoinColumn({ name: "updatedBy" })
  updater: Users;

  @ManyToOne(() => Users)
  @JoinColumn({ name: "deletedBy" })
  deleter: Users;
}
