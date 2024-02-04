import {AuthClientResponse, GuardContract} from "@adonisjs/auth/types"
import {symbols } from "@adonisjs/auth"
import {HttpContext } from "@adonisjs/core/http"
import User from "#apps/users/models/user"
import {AccessTokensUserProviderContract} from "@adonisjs/auth/types/access_tokens"
import jwt from 'jsonwebtoken'
import { errors as authErrors } from '@adonisjs/auth'
import {inject} from "@adonisjs/core"
import KeycloakService from "#apps/authentication/services/keycloak_service"
import logger from "@adonisjs/core/services/logger"

export type ResourceAccess = {
  [key: string]: {
    roles: string[]
  }
}

export type JWTPayloadData = {
  exp: number
  iat: number
  auth_time: number
  jti: string
  iss: string
  aud: string
  sub: string
  typ: string
  azp: string
  nonce: string
  session_state: string
  acr: string
  allowed_origins: string[]
  realm_access: {
    roles: string[]
  }
  resource_access: ResourceAccess
  scope: string
  sid: string
  upn: string
  email_verified: boolean
  name: string
  groups: string[]
  preferred_username: string
  given_name: string
  family_name: string
  email: string
}

@inject()
export class JwtGuard<
  UserProvider extends AccessTokensUserProviderContract<unknown>
> implements GuardContract<
  UserProvider[typeof symbols.PROVIDER_REAL_USER]
> {
  #userProvider: UserProvider
  #ctx: HttpContext
  payload?: JWTPayloadData

  constructor(
    ctx: HttpContext,
    userProvider: UserProvider,
    protected keycloakService: KeycloakService
  ) {
    this.#ctx = ctx
    this.#userProvider = userProvider
  }


  declare [symbols.GUARD_KNOWN_EVENTS]: {}

  driverName: 'jwt' = 'jwt'

  authenticationAttempted: boolean = false
  isAuthenticated: boolean = false
  user?: UserProvider[typeof symbols.PROVIDER_REAL_USER]

  async authenticate() {
    //this.authenticationAttempted = true

    const authHeader = this.#ctx.request.header('authorization')
    if (!authHeader) {
      throw new authErrors.E_UNAUTHORIZED_ACCESS('Unauthorized access', { guardDriverName: this.driverName })
    }

    const [, token] = authHeader.split('Bearer ')
    if (!token) {
      throw new authErrors.E_UNAUTHORIZED_ACCESS('WESH PAS DE TOKEN access', { guardDriverName: this.driverName })
    }
    logger.info('Verify token')
    const payload = await this.verifyToken(token)
    this.payload = payload as any
  }

  async authenticateAsClient(user: UserProvider[typeof symbols.PROVIDER_REAL_USER], ...args: any[]): Promise<AuthClientResponse> {
    const token = await this.#userProvider.createToken(user, args)
    return {
      headers: {
        authorization: `Bearer ${token.value!.release()}`
      }
    } as AuthClientResponse
  }

  async check(): Promise<boolean> {
    await this.authenticate()
    return Promise.resolve(true)
  }

  getUserOrFail(): UserProvider[typeof symbols.PROVIDER_REAL_USER] {
    return User.query().first();
  }
  async verifyToken(token: string) {
    try {
      const key = await this.keycloakService.getPublicCert()
      const publicKey = `-----BEGIN CERTIFICATE-----\n${key}\n-----END CERTIFICATE-----`

      const decodedToken = jwt.decode(token, { complete: true })

      const algorithm = decodedToken?.header.alg as jwt.Algorithm

      const verifyToken = jwt.verify(token, publicKey, { algorithms: [algorithm] })
      return verifyToken
    } catch (e) {
      console.log(e)
      throw new authErrors.E_UNAUTHORIZED_ACCESS('Unauthorized access', { guardDriverName: this.driverName })
    }
  }

}
