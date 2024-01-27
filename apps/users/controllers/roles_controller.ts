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
}
