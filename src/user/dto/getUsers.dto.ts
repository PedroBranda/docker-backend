import { IsEmail, IsString } from 'class-validator';

export class GetUsersDto {
  @IsString()
  readonly firstName: string;

  @IsString()
  readonly lastName: string;

  @IsEmail()
  readonly email: string;
}
