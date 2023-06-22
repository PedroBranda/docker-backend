import { Exclude } from 'class-transformer';
import { IsOptional, IsString } from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  readonly firstName?: string;

  @IsOptional()
  @IsString()
  readonly lastName?: string;

  @Exclude()
  readonly id: number;

  @Exclude()
  readonly permissions: number[];

  @Exclude()
  readonly email: string;

  @Exclude()
  readonly password: string;
}
