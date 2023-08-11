import { Exclude } from "class-transformer";
import { IsOptional, IsString } from "class-validator";

export class UpdateUserDto {
  @IsString({ message: "O campo: 'firstName' deve ser uma string" })
  @IsOptional()
  readonly firstName?: string;

  @IsString({ message: "O campo: 'lastName' deve ser uma string" })
  @IsOptional()
  readonly lastName?: string;

  @Exclude()
  readonly id: number;

  @Exclude()
  readonly permissions: number[];

  @Exclude()
  readonly email: string;

  @Exclude()
  readonly password: string;
}
