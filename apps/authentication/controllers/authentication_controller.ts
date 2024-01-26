import type { HttpContext } from '@adonisjs/core/http'
import {registerAuthenticationValidator} from '#apps/authentication/validators/authentication'
import {inject} from '@adonisjs/core'
import AuthenticationService from '#apps/authentication/services/authentication_service'

@inject()
export default class AuthenticationController {
  constructor(protected authenticationService: AuthenticationService) {}

  async login({ request, response }: HttpContext) {
    const { email, password } = request.only(['email', 'password'])

    const payload = await this.authenticationService.login(email, password)

    response.cookie('token', payload.token.value!.release())
    return response.send(payload)
  }

  async register ({ request, response }: HttpContext) {
    const payload = await request.validateUsing(registerAuthenticationValidator)

    const user = await this.authenticationService.createUser(payload)

    return response.send(user)
  }
}
