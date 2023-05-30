import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { compareSync } from 'bcrypt';
import { GetUserDto } from 'src/user/dto/getUser.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<GetUserDto> {
    const user = await this.userService.findForAuthentication(email);
    const passwordMatch = compareSync(password, user.password);

    if (!passwordMatch) {
      throw new BadRequestException(
        'E-mail ou senha informados podem estar incorretos',
      );
    }

    return user;
  }

  async sign(user: GetUserDto) {
    const payload = {
      email: user.email,
      id: user.id,
      permissionLevel: user.permissionLevel,
    };

    try {
      return {
        token: this.jwtService.sign(payload),
      };
    } catch (error) {
      throw new BadRequestException({
        message: 'Erro ao autenticar o usuário',
        error,
      });
    }
  }
}
