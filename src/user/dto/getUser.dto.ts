import { IsEmail, IsNumber, IsOptional, IsString } from 'class-validator';

export class GetUserDto {
  @IsOptional()
  @IsNumber()
  readonly id?: number;

  @IsOptional()
  @IsNumber()
  readonly permissionLevel?: number;

  @IsOptional()
  @IsString()
  readonly firstName?: string;

  @IsOptional()
  @IsString()
  readonly lastName?: string;

  @IsOptional()
  @IsEmail()
  readonly email?: string;
}
