import { IsEmail, IsNumber, IsOptional, IsString } from 'class-validator';

export class GetUserWithPasswordDto {
  @IsOptional()
  @IsString()
  readonly firstName?: string;

  @IsOptional()
  @IsNumber()
  readonly permissions?: number;

  @IsOptional()
  @IsString()
  readonly lastName?: string;

  @IsOptional()
  @IsEmail()
  readonly email?: string;

  @IsOptional()
  @IsEmail()
  readonly password?: string;
}
