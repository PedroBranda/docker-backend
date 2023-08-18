import { IsDateString, IsInt, IsOptional, IsPositive } from "class-validator";
import { Transform } from "class-transformer";

export abstract class AbstractDto {
  @IsInt({ message: "O campo: 'id' deve ser um número" })
  @IsPositive({ message: "O campo: 'id' deve ser positivo" })
  @IsOptional()
  @Transform(({ value }) => +value)
  readonly id?: number;

  @IsDateString(
    {},
    { message: "O campo: 'createdAt' deve ser uma ISO 8601 string" }
  )
  @IsOptional()
  readonly createdAt?: string;

  @IsDateString(
    {},
    { message: "O campo: 'updatedAt' deve ser uma ISO 8601 string" }
  )
  @IsOptional()
  readonly updatedAt?: string;

  @IsDateString(
    {},
    { message: "O campo: 'deletedAt' deve ser uma ISO 8601 string" }
  )
  @IsOptional()
  readonly deletedAt?: string;

  @IsInt({ message: "O campo: 'createdBy' deve ser um número" })
  @IsPositive({ message: "O campo: 'createdBy' deve ser positivo" })
  @IsOptional()
  @Transform(({ value }) => +value)
  readonly createdBy?: number;

  @IsInt({ message: "O campo: 'updatedBy' deve ser um número" })
  @IsPositive({ message: "O campo: 'updatedBy' deve ser positivo" })
  @IsOptional()
  @Transform(({ value }) => +value)
  readonly updatedBy?: number;

  @IsInt({ message: "O campo: 'deletedBy' deve ser um número" })
  @IsPositive({ message: "O campo: 'deletedBy' deve ser positivo" })
  @IsOptional()
  @Transform(({ value }) => +value)
  readonly deletedBy?: number;
}
