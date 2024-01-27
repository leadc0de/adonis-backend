import type { HttpContext } from '@adonisjs/core/http'
import {inject} from "@adonisjs/core";
import RoleService from "#apps/users/services/role_service";

@inject()
export default class RolesController {
  constructor(protected roleService: RoleService) {}
  /**
   * Display a list of resource
   */
  async index({ request, response }: HttpContext) {
    const page = request.input('page', 1)
    const size = request.input('size', 10)

    const roles = await this.roleService
      .findAll({ page, size })

    return response.send(roles)
  }

  /**
   * Handle form submission for the create action
   */
  async store({ request }: HttpContext) {}

  /**
   * Show individual record
   */
  async show({ params }: HttpContext) {}

  /**
   * Handle form submission for the edit action
   */
  async update({ params, request }: HttpContext) {}

  /**
   * Delete record
   */
  async destroy({ params }: HttpContext) {}
}
