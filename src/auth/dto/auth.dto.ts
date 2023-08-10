import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class AuthDto {
  @IsEmail({}, { message: "E-mail inválido" })
  readonly email: string;

  @IsNotEmpty({ message: "O campo: 'senha' é obrigatório" })
  @IsString({ message: "O campo: 'senha' deve ser uma string" })
  readonly password: string;
}
