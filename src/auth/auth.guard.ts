import {
  type CanActivate,
  type ExecutionContext,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { JwtService } from "@nestjs/jwt";
import { Request } from "express";
import { IS_PUBLIC_KEY } from "src/decorators/public.decorator";
import { UserService } from "src/user/user.service";
import { config } from "dotenv";
import { AuthUserPayload } from "./types/auth.types";

config();

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly reflector: Reflector,
    private readonly userService: UserService
  ) {}

  verifyId(id: number) {
    if (!id) {
      throw Error();
    }
  }

  async canActivate(context: ExecutionContext) {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);

    if (!token) {
      throw new UnauthorizedException({
        message: "Sem autorização",
      });
    }

    try {
      let { id }: AuthUserPayload = await this.jwtService.verify(token, {
        secret: process.env.JWT_SECRET,
      });

      this.verifyId(id);

      const user = await this.userService.findForAuthentication(id);

      request.user = user.result;
    } catch (_) {
      throw new UnauthorizedException({
        message: "Token inválido",
      });
    }

    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(" ") ?? [];

    return type === "Bearer" ? token : undefined;
  }
}
