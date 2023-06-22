import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { compareSync } from 'bcrypt';
import { GetUserDto } from 'src/user/dto/getUser.dto';
import { authUserPayload } from './auth.types';

// TODO: create JSDoc to all service functions and methods
@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.userService.findForAuthentication(email);
    const passwordMatch = compareSync(password, user.password);

    if (!passwordMatch) {
      throw new BadRequestException('E-mail or password given can be wrong');
    }

    return user;
  }

  async sign(user: GetUserDto) {
    const payload: authUserPayload = {
      id: user.id,
    };

    try {
      return {
        token: this.jwtService.sign(payload),
      };
    } catch (error) {
      throw new BadRequestException({
        message: 'Error to authenticate the user',
        error,
      });
    }
  }
}
