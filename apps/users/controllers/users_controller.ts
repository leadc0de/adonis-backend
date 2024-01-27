import type { HttpContext } from '@adonisjs/core/http'
import {inject} from '@adonisjs/core'
import UserService from '#apps/users/services/user_service'
import UserPolicy from '#apps/users/policies/user_policy'

@inject()
export default class UsersController {
  constructor(protected userService: UserService) {}

  async index({ request, response, bouncer }: HttpContext) {
    await bouncer.with(UserPolicy).authorize('view' as never)

    const page = request.input('page', 1)
    const size = request.input('size', 10)

    const users = await this.userService.findAll({ page, size })
    return response.send(users)
  }

  /**
   * Handle form submission for the create action
   */
  async store({ }: HttpContext) {

  }

  /**
   * Show individual record
   */
  async show({ params, request, response }: HttpContext) {
    const includeRole = request.input('includeRole', true)

    const user = await this.userService.findById(params.id, {
      includeRole
    })

    return response.send(user)
  }

  /**
   * Handle form submission for the edit action
   */
  async update({ }: HttpContext) {}

  /**
   * Delete record
   */
  async destroy({ }: HttpContext) {}
}
