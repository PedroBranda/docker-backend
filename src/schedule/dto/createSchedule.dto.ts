import { IsDateString, IsEnum, IsLatitude, IsLongitude } from 'class-validator';
import { SchedulePeriods, SportTypes } from '../schedule.entity';

export class CreateScheduleDto {
  @IsEnum(SportTypes)
  readonly sportType: SportTypes;

  @IsEnum(SchedulePeriods)
  readonly period: SchedulePeriods;

  @IsDateString()
  readonly scheduleDate: Date;

  @IsLatitude()
  readonly lat: number;

  @IsLongitude()
  readonly lng: number;
}
