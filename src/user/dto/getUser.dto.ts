import {
  IsDateString,
  IsEmail,
  IsNumber,
  IsOptional,
  IsPhoneNumber,
  IsString,
} from 'class-validator';

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
  @IsNumber()
  readonly gender?: number;

  @IsOptional()
  @IsDateString()
  readonly birthDate?: Date;

  @IsOptional()
  @IsPhoneNumber('BR')
  readonly phone?: string;

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
