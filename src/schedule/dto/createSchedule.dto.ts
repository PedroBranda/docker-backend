import {
  IsDateString,
  IsEnum,
  IsLatitude,
  IsLongitude,
  IsNumber,
} from "class-validator";
import {
  SchedulePeriods,
  SportModalities,
  SportTypes,
} from "../schedule.entity";

export class CreateScheduleDto {
  @IsEnum(SportTypes, {
    message: "O campo: 'sportType' deve ser um item do enum SportTypes",
  })
  readonly sportType: SportTypes;

  @IsEnum(SportModalities, {
    message:
      "O campo: 'sportModality' deve ser um item do enum SportModalities",
  })
  readonly sportModality: SportModalities;

  @IsEnum(SchedulePeriods, {
    message: "O campo: 'period' deve ser um item do enum SchedulePeriods",
  })
  readonly period: SchedulePeriods;

  @IsNumber({}, { message: "O campo: 'teamLimitSize' deve ser um número" })
  readonly teamLimitSize: number;

  @IsDateString(
    {},
    { message: "O campo: 'startScheduleDate' deve ser uma ISO 8601 string" }
  )
  readonly startScheduleDate: Date;

  @IsLatitude({ message: "O campo 'lat' deve ser um ponto de latitude" })
  readonly lat: number;

  @IsLongitude({ message: "O campo 'lng' deve ser um ponto de latitude" })
  readonly lng: number;
}
