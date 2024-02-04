import {GuardConfigProvider} from "@adonisjs/auth/types";
import {HttpContext} from "@adonisjs/core/http";
import {JwtGuard} from "#apps/authentication/guards/jwt_guard";
import KeycloakService from "#apps/authentication/services/keycloak_service";
import {AccessTokensUserProviderContract} from "@adonisjs/auth/types/access_tokens";

export function jwtGuard<UserProvider extends AccessTokensUserProviderContract<unknown>>(
  config: {
    provider: UserProvider
  }
): GuardConfigProvider<(ctx: HttpContext) => JwtGuard<UserProvider>> {
  return {
    async resolver() {
      const provider = config.provider
      return (ctx) => {
        return new JwtGuard(ctx, provider, new KeycloakService())
      }
    }
  }
}
