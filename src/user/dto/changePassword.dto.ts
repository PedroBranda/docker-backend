import { IsNotEmpty, IsString, IsStrongPassword } from "class-validator";

export class ChangePasswordDto {
  @IsString({ message: "O campo: 'oldPassword' deve ser uma string" })
  @IsNotEmpty({ message: "O campo: 'oldPassword' não pode ser vazio" })
  readonly oldPassword: string;

  @IsStrongPassword(
    {},
    { message: "O campo: 'newPassword' deve ser uma senha forte" }
  )
  readonly newPassword: string;
}
