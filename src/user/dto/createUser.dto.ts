import {
  IsDateString,
  IsEmail,
  IsNumber,
  IsPhoneNumber,
  IsString,
  IsStrongPassword,
} from "class-validator";

export class CreateUserDto {
  @IsString()
  readonly firstName: string;

  @IsString()
  readonly lastName: string;

  @IsString()
  readonly document: string;

  @IsNumber()
  readonly documentType: number;

  @IsNumber()
  readonly gender: number;

  @IsDateString()
  readonly birthDate: Date;

  @IsPhoneNumber("BR")
  readonly phone: string;

  @IsEmail()
  readonly email: string;

  @IsStrongPassword()
  readonly password: string;
}
