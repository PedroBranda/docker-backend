import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { compareSync } from 'bcrypt';
import { AuthDto } from './dto/auth.dto';

// TODO: create JSDoc to all service functions and methods
@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(authDto: AuthDto) {
    const {
      result: { id, password },
    } = await this.userService.findWhere({
      email: authDto.email,
    });
    const passwordMatch = compareSync(authDto.password, password);

    if (!passwordMatch) {
      throw new BadRequestException('E-mail or password given can be wrong');
    }

    return id;
  }

  async sign(id: number) {
    try {
      return {
        token: this.jwtService.sign({ id }),
      };
    } catch (error) {
      throw new BadRequestException({
        message: 'Error to authenticate the user',
        error,
      });
    }
  }
}
