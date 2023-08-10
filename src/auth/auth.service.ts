import { BadRequestException, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { compareSync } from "bcrypt";
import { type AuthDto } from "./dto/auth.dto";
import { UserRepository } from "../user/user.repository";
import { type Users } from "../user/user.entity";

// TODO: create JSDoc to all service functions and methods
@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService
  ) {}

  async validateUser(authDto: AuthDto) {
    let user: Users;

    try {
      user = await this.userRepository.findOneOrFail({
        where: { email: authDto.email },
        select: ["id", "password"],
      });
    } catch (error) {
      throw new BadRequestException({
        message: "E-mail ou senha informados podem estar errados",
      });
    }

    const passwordMatch = compareSync(authDto.password, user.password);

    if (!passwordMatch) {
      throw new BadRequestException({
        message: "E-mail ou senha informados podem estar errados",
      });
    }

    return user.id;
  }

  async sign(id: number) {
    try {
      return {
        token: this.jwtService.sign({ id }),
      };
    } catch (error) {
      throw new BadRequestException({
        message: "Erro ao autenticar o usuário",
      });
    }
  }
}
