import { IsDateString, IsNumber, IsOptional } from "class-validator";
import { Transform } from "class-transformer";

export class GetLocationDto {
  @IsNumber({}, { message: "O campo: 'id' deve ser um número" })
  @IsOptional()
  @Transform(({ value }) => +value)
  readonly id?: number;

  @IsNumber({}, { message: "O campo: 'locationType' deve ser um número" })
  @IsOptional()
  @Transform(({ value }) => +value)
  readonly locationType?: number;

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

  @IsNumber({}, { message: "O campo: 'createdBy' deve ser um número" })
  @IsOptional()
  @Transform(({ value }) => +value)
  readonly createdBy?: number;

  @IsNumber({}, { message: "O campo: 'updatedBy' deve ser um número" })
  @IsOptional()
  @Transform(({ value }) => +value)
  readonly updatedBy?: number;

  @IsNumber({}, { message: "O campo: 'deletedBy' deve ser um número" })
  @IsOptional()
  @Transform(({ value }) => +value)
  readonly deletedBy?: number;
}
