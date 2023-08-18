import { Exclude } from "class-transformer";
import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class UpdateUserDto {
  @IsString({ message: "O campo: 'firstName' deve ser uma string" })
  @IsNotEmpty({ message: "O campo: 'firstName' não pode ser vazio" })
  @IsOptional()
  readonly firstName?: string;

  @IsString({ message: "O campo: 'lastName' deve ser uma string" })
  @IsNotEmpty({ message: "O campo: 'lastName' não pode ser vazio" })
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
