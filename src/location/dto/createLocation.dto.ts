import { IsLatitude, IsLongitude } from "class-validator";
import { i18nValidationMessage } from "nestjs-i18n";
import { I18nTranslations } from "../../generated/i18n.generated";

export class CreateLocationDto {
  @IsLatitude({
    message: i18nValidationMessage<I18nTranslations>(
      "validation.INVALID_LATITUDE"
    ),
  })
  readonly lat: number;

  @IsLongitude({
    message: i18nValidationMessage<I18nTranslations>(
      "validation.INVALID_LONGITUDE"
    ),
  })
  readonly lng: number;
}
