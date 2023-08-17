import { IsDateString, IsNumber, IsObject, IsOptional } from "class-validator";
import { GetUserDto } from "../../user/dto/getUser.dto";
import { Transform } from "class-transformer";

export class GetTeamDto {
  @IsNumber({}, { message: "O campo: 'id' deve ser um número" })
  @IsOptional()
  @Transform(({ value }) => +value)
  id?: number;

  @IsNumber({}, { message: "O campo: 'teamSizeLimit' deve ser um número" })
  @IsOptional()
  @Transform(({ value }) => +value)
  teamSizeLimit?: number;

  @IsDateString(
    {},
    { message: "O campo: 'createdAt' deve ser uma ISO 8601 string" }
  )
  @IsOptional()
  readonly createdAt?: string;

  @IsDateString(
    {},
    { message: "O campo: 'updatedAt' deve ser uma ISO 8601 string" }
  )
  @IsOptional()
  readonly updatedAt?: string;

  @IsDateString(
    {},
    { message: "O campo: 'deletedAt' deve ser uma ISO 8601 string" }
  )
  @IsOptional()
  readonly deletedAt?: string;

  @IsNumber({}, { message: "O campo: 'createdBy' deve ser um número" })
  @IsOptional()
  @Transform(({ value }) => +value)
  readonly createdBy?: number;

  @IsNumber({}, { message: "O campo: 'updatedBy' deve ser um número" })
  @IsOptional()
  @Transform(({ value }) => +value)
  readonly updatedBy?: number;

  @IsNumber({}, { message: "O campo: 'deletedBy' deve ser um número" })
  @IsOptional()
  @Transform(({ value }) => +value)
  readonly deletedBy?: number;
}
