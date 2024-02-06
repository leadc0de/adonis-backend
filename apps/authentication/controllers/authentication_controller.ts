import type { HttpContext } from '@adonisjs/core/http'
import {registerAuthenticationValidator} from '#apps/authentication/validators/authentication'
import {inject} from '@adonisjs/core'
import AuthenticationService from '#apps/authentication/services/authentication_service'
import KeycloakService from "#apps/authentication/services/keycloak_service"
import logger from "@adonisjs/core/services/logger"

@inject()
export default class AuthenticationController {
  constructor(
    protected authenticationService: AuthenticationService,
    protected keycloakService: KeycloakService,
  ) {}

  async login({ request, response }: HttpContext) {
    const { username, password } = request.only(['username', 'password'])
    const token = await this.keycloakService.loginWithPassword(username, password)

    return response.send(token)
    //const payload = await this.authenticationService.login(email, password)

    //response.cookie('token', payload.token.value!.release())
    //return response.send(payload)
  }

  async register ({ request, response }: HttpContext) {
    const payload = await request.validateUsing(registerAuthenticationValidator)

    const user = await this.authenticationService.createUser(payload)

    return response.send(user)
  }

  async me ({ auth, response }: HttpContext) {
    const t = auth.use('jwt')
    logger.info('Controller me')
    console.log("ME", t.payload)
    return response.send({
      data: t.payload
    })
  }
}
