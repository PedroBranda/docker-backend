import { IsDateString, IsEnum, IsNumber, IsOptional } from "class-validator";
import {
  SchedulePeriods,
  SportModalities,
  SportTypes,
} from "../schedule.entity";
import { Transform } from "class-transformer";

export class GetScheduleDto {
  @IsNumber({}, { message: "O campo: 'id' deve ser um número" })
  @IsOptional()
  @Transform((property) => +property.value)
  readonly id?: number;

  @IsEnum(SportTypes, {
    message: "O campo: 'sportType' deve ser um item do enum SportTypes",
  })
  @IsOptional()
  @Transform((property) => +property.value)
  readonly sportType?: SportTypes;

  @IsEnum(SportModalities, {
    message:
      "O campo: 'sportModality' deve ser um item do enum SportModalities",
  })
  @IsOptional()
  @Transform((property) => +property.value)
  readonly sportModality?: SportModalities;

  @IsDateString(
    {},
    { message: "O campo: 'startScheduleDate' deve ser uma ISO 8601 string" }
  )
  @IsOptional()
  readonly startScheduleDate?: Date;

  @IsDateString(
    {},
    { message: "O campo: 'endScheduleDate' deve ser uma ISO 8601 string" }
  )
  @IsOptional()
  readonly endScheduleDate?: Date;

  @IsEnum(SchedulePeriods, {
    message: "O campo: 'period' deve ser um item do enum SchedulePeriods",
  })
  @IsOptional()
  @Transform((property) => +property.value)
  readonly period?: SchedulePeriods;

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
