import { IsEmail, IsNumber, IsOptional, IsString } from 'class-validator';

export class GetUserDto {
  @IsOptional()
  @IsNumber()
  readonly id?: number;

  @IsOptional()
  @IsString()
  readonly document?: string;

  @IsOptional()
  @IsNumber()
  readonly documentType?: number;

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
