import {
  IsBoolean,
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsOptional,
} from "class-validator";
import {
  SchedulePeriods,
  SportModalities,
  SportTypes,
} from "../schedule.entity";
import { Transform } from "class-transformer";
import { AbstractWithPaginationDto } from "../../common/abstract/abstractWithPagination.dto";

export class GetScheduleDto extends AbstractWithPaginationDto {
  @IsEnum(SportTypes, {
    message: `O campo: 'sportType' deve ser um item do enum SportTypes:${Object.values(
      SportTypes
    )
      .filter((value) => typeof value === "number")
      .map((value) => ` ${value}`)
      .join(",")}`,
  })
  @IsOptional()
  @Transform(({ value }) => +value)
  readonly sportType?: SportTypes;

  @IsEnum(SportModalities, {
    message: `O campo: 'sportModality' deve ser um item do enum SportModalities:${Object.values(
      SportModalities
    )
      .filter((value) => typeof value === "number")
      .map((value) => ` ${value}`)
      .join(",")}`,
  })
  @IsOptional()
  @Transform(({ value }) => +value)
  readonly sportModality?: SportModalities;

  @IsEnum(SchedulePeriods, {
    message: `O campo: 'period' deve ser um item do enum SchedulePeriods:${Object.values(
      SchedulePeriods
    )
      .filter((value) => typeof value === "number")
      .map((value) => ` ${value}`)
      .join(",")}`,
  })
  @IsOptional()
  @Transform(({ value }) => +value)
  readonly period?: SchedulePeriods;

  @IsDateString(
    {},
    { message: "O campo: 'startScheduleDate' deve ser uma ISO 8601 string" }
  )
  @IsOptional()
  readonly startScheduleDate?: string;

  @IsDateString(
    {},
    { message: "O campo: 'endScheduleDate' deve ser uma ISO 8601 string" }
  )
  @IsOptional()
  @Transform(({ value }) => new Date(value))
  readonly endScheduleDate?: string;

  @IsBoolean({ message: "O campo: 'closed' deve ser um booleano" })
  @IsOptional()
  @Transform(({ value }) =>
    value === "true" ? true : value === "false" ? false : ""
  )
  readonly isOpen: boolean;
}
