import { defineConfig } from '@adonisjs/auth'
import {InferAuthEvents, Authenticators, InferAuthenticators} from '@adonisjs/auth/types'
import {tokensGuard, tokensUserProvider} from "@adonisjs/auth/access_tokens";
import {jwtGuard} from "#apps/authentication/config/jwt";


const authConfig = defineConfig({
  default: 'jwt',
  guards: {
    api: tokensGuard({
      provider: tokensUserProvider({
        model: () => import('#apps/users/models/user'),
        tokens: 'authTokens'
      })
    }),
    jwt: jwtGuard({
      model: () => import('#apps/users/models/user'),
    })
  },
})

export default authConfig

/**
 * Inferring types from the configured auth
 * guards.
 */
declare module '@adonisjs/auth/types' {
  interface Authenticators extends InferAuthenticators<typeof authConfig> {}
}
declare module '@adonisjs/core/types' {
  interface EventsList extends InferAuthEvents<Authenticators> {}
}
