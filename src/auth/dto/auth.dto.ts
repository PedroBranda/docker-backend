import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class AuthDto {
  @IsEmail({}, { message: "E-mail inválido" })
  readonly email: string;

  @IsString({ message: "O campo: 'senha' deve ser uma string" })
  @IsNotEmpty({ message: "O campo: 'senha' não pode ser vazio" })
  readonly password: string;
}
