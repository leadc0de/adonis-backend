import type { HttpContext } from '@adonisjs/core/http'
import {inject} from "@adonisjs/core";
import RoleService from "#apps/users/services/role_service";
import { storeRoleValidator, updateRoleValidator } from '#apps/users/validators/role_validator'
import Role from '#apps/users/models/role'
import RolePolicy from '#apps/users/policies/role_policy'

@inject()
export default class RolesController {
  constructor(protected roleService: RoleService) {}
  /**
   * Display a list of resource
   */
  async index({ request, response }: HttpContext) {
    const page = request.input('page', 1)
    const limit = request.input('limit', 10)

    const roles = await this.roleService
      .findAll({ page, limit })

    return response.send(roles)
  }

  async show({ bouncer, params }: HttpContext): Promise<Role> {
    await bouncer.with(RolePolicy).authorize('view' as never)
    return this.roleService.findById(params.id)
  }

  async store({ bouncer, request }: HttpContext): Promise<void> {
    await bouncer.with(RolePolicy).authorize('store' as never)

    const data = await request.validateUsing(storeRoleValidator)
    await this.roleService.create(data)
  }

  async update({ bouncer, request, params }: HttpContext): Promise<void> {
    await bouncer.with(RolePolicy).authorize('update' as never)

    const role = await Role.firstOrFail(params.id)
    const data = await request.validateUsing(updateRoleValidator)

    await this.roleService.update(role, data)
  }

  async destroy({ bouncer, params }: HttpContext): Promise<void> {
    await bouncer.with(RolePolicy).authorize('destroy' as never)

    const role = await Role.firstOrFail(params.id)
    await this.roleService.destroy(role)
  }
}
