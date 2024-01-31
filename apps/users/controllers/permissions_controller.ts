import type { HttpContext } from '@adonisjs/core/http'
import { inject } from "@adonisjs/core";
import PermissionService from '#apps/users/services/permission_service'

@inject()
export default class PermissionsController {
  constructor(protected permissionService: PermissionService) {}

  async index({ request }: HttpContext) {
    const page = request.input('page', 1)
    const limit = request.input('limit', 10)

    return this.permissionService
      .findAll({ page, limit })
  }
}
