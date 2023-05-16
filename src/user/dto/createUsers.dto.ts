import { IsEmail, IsString, IsStrongPassword } from 'class-validator';

export class CreateUsersDto {
  @IsString()
  readonly firstName: string;

  @IsString()
  readonly lastName: string;

  @IsEmail()
  readonly email: string;

  @IsStrongPassword()
  readonly password: string;
}
