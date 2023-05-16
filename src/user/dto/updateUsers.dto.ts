import { Exclude, Transform } from 'class-transformer';
import { IsEmail, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateUsersDto {
  @Transform((id) => +id.value)
  @IsNumber()
  readonly id: number;

  @IsOptional()
  @IsString()
  readonly firstName?: string;

  @IsOptional()
  @IsString()
  readonly lastName?: string;

  @IsOptional()
  @IsEmail()
  readonly email?: string;

  @Exclude()
  readonly password: string;
}
