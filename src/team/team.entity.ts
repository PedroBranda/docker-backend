import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { IsOptional } from 'class-validator';
import { DefaultUsers, Users } from '../user/user.entity';

@Entity()
export class Teams {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  teamSizeLimit: number;

  @ManyToMany(() => Users)
  @JoinTable({
    name: 'team_user',
    joinColumn: {
      name: 'teamId',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'userId',
      referencedColumnName: 'id',
    },
  })
  users: Users[];

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
