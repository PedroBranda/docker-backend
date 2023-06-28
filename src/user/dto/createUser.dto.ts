import { IsEmail, IsNumber, IsString, IsStrongPassword } from 'class-validator';

export class CreateUserDto {
  @IsString()
  readonly firstName: string;

  @IsString()
  readonly lastName: string;

  @IsString()
  document: string;

  @IsNumber()
  documentType: number;

  @IsEmail()
  readonly email: string;

  @IsStrongPassword()
  readonly password: string;
}
