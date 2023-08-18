import { IsInt, IsOptional, Max, Min } from "class-validator";
import { Transform } from "class-transformer";
import { AbstractDto } from "./abstract.dto";

export abstract class AbstractWithPaginationDto extends AbstractDto {
  @IsInt({ message: "O campo: 'perPage' deve ser um número" })
  @Min(1, {
    message: "O campo: 'perPage' deve ser igual ou maior que 1",
  })
  @Max(50, {
    message: "O campo: 'perPage' deve ser igual ou menor que 50",
  })
  @IsOptional()
  @Transform(({ value }) => +value)
  readonly perPage?: number;

  @IsInt({ message: "O campo: 'page' deve ser um número" })
  @Min(1, {
    message: "O campo: 'page' deve ser igual ou maior que 1",
  })
  @IsOptional()
  @Transform(({ value }) => +value)
  readonly page?: number;
}
