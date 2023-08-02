import {
  IsDateString,
  IsEnum,
  IsLatitude,
  IsLongitude,
  IsNumber,
} from "class-validator";
import { SchedulePeriods, SportTypes } from "../schedule.entity";
import { i18nValidationMessage } from "nestjs-i18n";
import { I18nTranslations } from "../../generated/i18n.generated";

export class CreateScheduleDto {
  @IsEnum(SportTypes, {
    message: i18nValidationMessage<I18nTranslations>("validation.INVALID_ENUM"),
  })
  readonly sportType: SportTypes;

  @IsEnum(SchedulePeriods, {
    message: i18nValidationMessage<I18nTranslations>("validation.INVALID_ENUM"),
  })
  readonly period: SchedulePeriods;

  @IsNumber(
    {},
    {
      message: i18nValidationMessage<I18nTranslations>(
        "validation.INVALID_NUMBER"
      ),
    }
  )
  readonly teamLimitSize: number;

  @IsDateString(
    {},
    {
      message: i18nValidationMessage<I18nTranslations>(
        "validation.INVALID_DATE_STRING"
      ),
    }
  )
  readonly startScheduleDate: Date;

  @IsLatitude({
    message: i18nValidationMessage<I18nTranslations>(
      "validation.INVALID_LATITUDE"
    ),
  })
  readonly lat: number;

  @IsLongitude({
    message: i18nValidationMessage<I18nTranslations>(
      "validation.INVALID_LONGITUDE",
      {
        property: i18nValidationMessage<I18nTranslations>("test.HELLO", {
          targetName: "lng",
        }),
      }
    ),
  })
  readonly lng: number;
}
