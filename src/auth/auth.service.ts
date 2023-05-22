import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { compareSync } from 'bcrypt';
import { GetUserDto } from 'src/user/dto/getUser.dto';
import { config } from 'dotenv';

config();

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<GetUserDto> {
    const user = await this.userService.findForAuthentication({ email });

    if (user) {
      const passwordMatch = compareSync(password, user.password);

      if (passwordMatch) {
        return user;
      }
    }

    throw new BadRequestException(
      'E-mail ou senha informados podem estar incorretos',
    );
  }

  async sign(user: GetUserDto) {
    const payload = { email: user.email, id: user.id };

    try {
      return {
        token: this.jwtService.sign(payload),
      };
    } catch (error) {
      throw new BadRequestException('Erro ao autenticar o usuário');
    }
  }
}
