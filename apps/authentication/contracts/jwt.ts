import jwt from 'jsonwebtoken'
import { AccessTokensUserProviderContract } from '@adonisjs/auth/types/access_tokens'
import { symbols } from '@adonisjs/auth'

export type JwtPayload = jwt.JwtPayload

export type ResourceAccess = {
  [key: string]: {
    roles: string[]
  }
}

export type JwtProviderConfig<T extends AccessTokensUserProviderContract<unknown>> = {
  model: () => Promise<{ default: T[typeof symbols.PROVIDER_REAL_USER] }>
}
