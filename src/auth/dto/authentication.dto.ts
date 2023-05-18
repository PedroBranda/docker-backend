import { IsEmail, IsString } from 'class-validator';

export class AuthenticationDto {
  @IsEmail()
  readonly email: string;

  @IsString()
  readonly password: string;
}
