import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { I18nValidationExceptionFilter, I18nValidationPipe } from "nestjs-i18n";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new I18nValidationPipe());
  app.useGlobalFilters(new I18nValidationExceptionFilter());
  await app.listen(process.env.APP_PORT);
}

bootstrap().then(() => {
  console.log("Server Started at port: " + process.env.APP_PORT);
});
