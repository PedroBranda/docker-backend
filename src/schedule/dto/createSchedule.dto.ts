import {
  IsDateString,
  IsEnum,
  IsLatitude,
  IsLongitude,
  IsNumber,
} from "class-validator";
import { SchedulePeriods, SportTypes } from "../schedule.entity";

export class CreateScheduleDto {
  @IsEnum(SportTypes)
  readonly sportType: SportTypes;

  @IsEnum(SchedulePeriods)
  readonly period: SchedulePeriods;

  @IsNumber()
  readonly teamLimitSize: number;

  @IsDateString()
  readonly startScheduleDate: Date;

  @IsLatitude()
  readonly lat: number;

  @IsLongitude()
  readonly lng: number;
}
