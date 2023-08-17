import {
  IsDateString,
  IsEmail,
  IsEnum,
  IsPhoneNumber,
  IsString,
  IsStrongPassword,
} from "class-validator";
import { DocumentTypes, UserGenders } from "../user.entity";

export class CreateUserDto {
  @IsString({ message: "O campo: 'firstName' deve ser uma string" })
  readonly firstName: string;

  @IsString({ message: "O campo: 'lastName' deve ser uma string" })
  readonly lastName: string;

  @IsString({ message: "O campo: 'document' deve ser uma string" })
  readonly document: string;

  @IsEnum(DocumentTypes, {
    message: `O campo: 'documentType' deve ser um item do enum DocumentTypes:${Object.values(
      DocumentTypes
    )
      .filter((value) => typeof value === "number")
      .map((value) => ` ${value}`)
      .join(",")}`,
  })
  readonly documentType: DocumentTypes;

  @IsEnum(UserGenders, {
    message: `O campo: 'gender' deve ser um item do enum UserGenders:${Object.values(
      UserGenders
    )
      .filter((value) => typeof value === "number")
      .map((value) => ` ${value}`)
      .join(",")}`,
  })
  readonly gender: UserGenders;

  @IsDateString(
    {},
    { message: "O campo: 'birthDate' deve ser uma ISO 8601 string" }
  )
  readonly birthDate: string;

  @IsPhoneNumber("BR", {
    message: "O campo: 'phone' deve ser um número telefônico",
  })
  readonly phone: string;

  @IsEmail({}, { message: "E-mail inválido" })
  readonly email: string;

  @IsStrongPassword(
    {},
    { message: "O campo: 'password' deve ser uma senha forte" }
  )
  readonly password: string;
}
