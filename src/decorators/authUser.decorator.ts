import { createParamDecorator, type ExecutionContext } from "@nestjs/common";
import { type AuthUserPropertyTypes } from "./types/authUserProperty.types";

/**
 * Handler that returns the authenticated user, or some of his properties
 * @param property - The property to extract
 */
export const AuthUser = createParamDecorator(
  (property: AuthUserPropertyTypes, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    return property ? user?.[property] : user;
  }
);
