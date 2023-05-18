import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthenticationDto } from './dto/authentication.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  async auth(@Body() authenticationDto: AuthenticationDto) {
    const userValidated = await this.authService.validateUser(
      authenticationDto.email,
      authenticationDto.password,
    );

    if (userValidated) {
      return this.authService.sign(userValidated);
    }
  }
}
