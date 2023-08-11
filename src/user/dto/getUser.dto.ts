import {
  IsDateString,
  IsEmail,
  IsEnum,
  IsNumber,
  IsOptional,
  IsPhoneNumber,
  IsString,
} from "class-validator";
import { Transform } from "class-transformer";
import { DocumentTypes, UserGenders } from "../user.entity";

export class GetUserDto {
  @IsNumber({}, { message: "O campo: 'id' deve ser um número" })
  @IsOptional()
  @Transform((property) => +property.value)
  readonly id?: number;

  @IsString({ message: "O campo: 'document' deve ser uma string" })
  @IsOptional()
  readonly document?: string;

  @IsEnum(DocumentTypes, {
    message: "O campo: 'documentType' deve ser um item do enum DocumentTypes",
  })
  @IsOptional()
  @Transform((property) => +property.value)
  readonly documentType?: DocumentTypes;

  @IsEnum(UserGenders, {
    message: "O campo: 'gender' deve ser um item do enum UserGenders",
  })
  @IsOptional()
  @Transform((property) => +property.value)
  readonly gender?: UserGenders;

  @IsDateString(
    {},
    { message: "O campo: 'birthDate' deve ser uma ISO 8601 string" }
  )
  @IsOptional()
  readonly birthDate?: Date;

  @IsPhoneNumber("BR", {
    message: "O campo: 'phone' deve ser um número telefônico",
  })
  @IsOptional()
  readonly phone?: string;

  @IsString({ message: "O campo: 'firstName' deve ser uma string" })
  @IsOptional()
  readonly firstName?: string;

  @IsString({ message: "O campo: 'lastName' deve ser uma string" })
  @IsOptional()
  readonly lastName?: string;

  @IsEmail({}, { message: "E-mail inválido" })
  @IsOptional()
  readonly email?: string;

  @IsDateString(
    {},
    { message: "O campo: 'createdAt' deve ser uma ISO 8601 string" }
  )
  @IsOptional()
  readonly createdAt?: Date;

  @IsDateString(
    {},
    { message: "O campo: 'updatedAt' deve ser uma ISO 8601 string" }
  )
  @IsOptional()
  readonly updatedAt?: Date;

  @IsDateString(
    {},
    { message: "O campo: 'deletedAt' deve ser uma ISO 8601 string" }
  )
  @IsOptional()
  readonly deletedAt?: Date;

  @IsNumber({}, { message: "O campo: 'createdBy' deve ser um número" })
  @IsOptional()
  @Transform((property) => +property.value)
  readonly createdBy?: number;

  @IsNumber({}, { message: "O campo: 'updatedBy' deve ser um número" })
  @IsOptional()
  @Transform((property) => +property.value)
  readonly updatedBy?: number;

  @IsNumber({}, { message: "O campo: 'deletedBy' deve ser um número" })
  @IsOptional()
  @Transform((property) => +property.value)
  readonly deletedBy?: number;
}
