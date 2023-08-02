import { IsEmail, IsNotEmpty, IsString } from "class-validator";
import { I18nService, i18nValidationMessage } from "nestjs-i18n";
import { I18nTranslations } from "../../generated/i18n.generated";

export class AuthDto {
  constructor(private readonly i18n: I18nService<I18nTranslations>) {}

  @IsEmail(
    {},
    {
      message: i18nValidationMessage<I18nTranslations>(
        "validation.INVALID_EMAIL"
      ),
    }
  )
  @IsNotEmpty({
    message: i18nValidationMessage<I18nTranslations>("validation.NOT_EMPTY"),
  })
  readonly email: string;

  @IsString({
    message: i18nValidationMessage<I18nTranslations>(
      "validation.INVALID_STRING"
    ),
  })
  @IsNotEmpty({
    message: i18nValidationMessage<I18nTranslations>("validation.NOT_EMPTY"),
  })
  readonly password: string;
}
