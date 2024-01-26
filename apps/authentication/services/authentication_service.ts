import {RegisterAuthenticationSchema} from '#apps/authentication/validators/authentication'
import User from '#apps/users/models/user'
import logger from '@adonisjs/core/services/logger'
import {AccessToken} from "@adonisjs/auth/access_tokens";

export default class AuthenticationService {
  async createUser(payload: RegisterAuthenticationSchema): Promise<User> {
    const user = await User.create(payload)

    logger.info(`[AuthenticationService]: User ${user.id} has been successfully created`)

    return user
  }

  async login (uid: string, password: string): Promise<{ token: AccessToken, user: User }> {
    const user = await User.verifyCredentials(uid, password)
    const token = await User.authTokens.create(user)

    return { token, user }
  }
}
