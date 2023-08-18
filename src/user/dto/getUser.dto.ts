import {
  IsDateString,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsString,
} from "class-validator";
import { Transform } from "class-transformer";
import { DocumentTypes, UserGenders } from "../user.entity";
import { AbstractWithPaginationDto } from "../../common/abstract/abstractWithPagination.dto";

export class GetUserDto extends AbstractWithPaginationDto {
  @IsString({ message: "O campo: 'document' deve ser uma string" })
  @IsNotEmpty({ message: "O campo: 'document' não pode ser vazio" })
  @IsOptional()
  readonly document?: string;

  @IsEnum(DocumentTypes, {
    message: `O campo: 'documentType' deve ser um item do enum DocumentTypes:${Object.values(
      DocumentTypes
    )
      .filter((value) => typeof value === "number")
      .map((value) => ` ${value}`)
      .join(",")}`,
  })
  @IsOptional()
  @Transform(({ value }) => +value)
  readonly documentType?: DocumentTypes;

  @IsEnum(UserGenders, {
    message: `O campo: 'gender' deve ser um item do enum UserGenders:${Object.values(
      UserGenders
    )
      .filter((value) => typeof value === "number")
      .map((value) => ` ${value}`)
      .join(",")}`,
  })
  @IsOptional()
  @Transform(({ value }) => +value)
  readonly gender?: UserGenders;

  @IsDateString(
    {},
    { message: "O campo: 'birthDate' deve ser uma ISO 8601 string" }
  )
  @IsOptional()
  readonly birthDate?: string;

  @IsPhoneNumber("BR", {
    message: "O campo: 'phone' deve ser um número telefônico",
  })
  @IsOptional()
  readonly phone?: string;

  @IsString({ message: "O campo: 'firstName' deve ser uma string" })
  @IsNotEmpty({ message: "O campo: 'firstName' não pode ser vazio" })
  @IsOptional()
  readonly firstName?: string;

  @IsString({ message: "O campo: 'lastName' deve ser uma string" })
  @IsNotEmpty({ message: "O campo: 'lastName' não pode ser vazio" })
  @IsOptional()
  readonly lastName?: string;

  @IsEmail({}, { message: "O campo: 'email' deve ser um e-mail válido" })
  @IsOptional()
  readonly email?: string;
}
