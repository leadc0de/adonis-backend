import type { HttpContext } from '@adonisjs/core/http'
import {inject} from '@adonisjs/core'
import UserService from '#apps/users/services/user_service'

@inject()
export default class UsersController {
  constructor(protected userService: UserService) {}

  async index({ request }: HttpContext) {
    const { page = 1, size = 10 } = request.qs()

    return this.userService.findAll({ page, size })
  }

  /**
   * Handle form submission for the create action
   */
  async store({ }: HttpContext) {}

  /**
   * Show individual record
   */
  async show({ }: HttpContext) {}

  /**
   * Handle form submission for the edit action
   */
  async update({ }: HttpContext) {}

  /**
   * Delete record
   */
  async destroy({ }: HttpContext) {}
}
