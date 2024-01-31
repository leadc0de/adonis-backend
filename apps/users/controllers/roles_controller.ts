import type { HttpContext } from '@adonisjs/core/http'
import {inject} from "@adonisjs/core";
import RoleService from "#apps/users/services/role_service";
import { storeRoleValidator, updateRoleValidator } from '#apps/users/validators/role_validator'
import Role from '#apps/users/models/role'

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

  async show({ params }: HttpContext): Promise<Role> {
    return this.roleService.findById(params.id)
  }

  async store({ request }: HttpContext): Promise<void> {
    const data = await request.validateUsing(storeRoleValidator)
    await this.roleService.create(data)
  }

  async update({ request, params }: HttpContext): Promise<void> {
    const role = await Role.firstOrFail(params.id)
    const data = await request.validateUsing(updateRoleValidator)

    await this.roleService.update(role, data)
  }

  async destroy({ params }: HttpContext): Promise<void> {
    const role = await Role.firstOrFail(params.id)
    await this.roleService.destroy(role)
  }
}
