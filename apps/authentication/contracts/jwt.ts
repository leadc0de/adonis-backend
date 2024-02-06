import jwt from 'jsonwebtoken'

export type JwtPayload = jwt.JwtPayload

export type ResourceAccess = {
  [key: string]: {
    roles: string[]
  }
}
