import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { AuthUserPropertyTypes } from './types/authUserProperty.types';

/**
 * Handler that returns the authenticated user, or some of his properties
 * @param property - The property to extract
 */
export const AuthUser = createParamDecorator(
  (property: AuthUserPropertyTypes, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const user = request.user;

    return property ? user?.[property] : user;
  },
);
