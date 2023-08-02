import { IsDateString, IsNumber, IsObject, IsOptional } from "class-validator";
import { i18nValidationMessage } from "nestjs-i18n";
import { I18nTranslations } from "../../generated/i18n.generated";

export class GetLocationDto {
  @IsNumber(
    {},
    {
      message: i18nValidationMessage<I18nTranslations>(
        "validation.INVALID_NUMBER"
      ),
    }
  )
  @IsOptional()
  readonly id?: number;

  @IsObject({
    message: i18nValidationMessage<I18nTranslations>(
      "validation.INVALID_OBJECT"
    ),
  })
  @IsOptional()
  readonly point?: {
    type: "Point";
    coordinates: number;
    bbox: number;
  };

  @IsNumber(
    {},
    {
      message: i18nValidationMessage<I18nTranslations>(
        "validation.INVALID_NUMBER"
      ),
    }
  )
  @IsOptional()
  readonly locationType?: number;

  @IsDateString(
    {},
    {
      message: i18nValidationMessage<I18nTranslations>(
        "validation.INVALID_DATE_STRING"
      ),
    }
  )
  @IsOptional()
  readonly createdAt?: Date;

  @IsDateString(
    {},
    {
      message: i18nValidationMessage<I18nTranslations>(
        "validation.INVALID_DATE_STRING"
      ),
    }
  )
  @IsOptional()
  readonly updatedAt?: Date;

  @IsDateString(
    {},
    {
      message: i18nValidationMessage<I18nTranslations>(
        "validation.INVALID_DATE_STRING"
      ),
    }
  )
  @IsOptional()
  readonly deletedAt?: Date;

  @IsNumber(
    {},
    {
      message: i18nValidationMessage<I18nTranslations>(
        "validation.INVALID_NUMBER"
      ),
    }
  )
  @IsOptional()
  readonly createdBy?: number;

  @IsNumber(
    {},
    {
      message: i18nValidationMessage<I18nTranslations>(
        "validation.INVALID_NUMBER"
      ),
    }
  )
  @IsOptional()
  readonly updatedBy?: number;

  @IsNumber(
    {},
    {
      message: i18nValidationMessage<I18nTranslations>(
        "validation.INVALID_NUMBER"
      ),
    }
  )
  @IsOptional()
  readonly deletedBy?: number;
}
