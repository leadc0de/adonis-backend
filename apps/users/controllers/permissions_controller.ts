import type { HttpContext } from '@adonisjs/core/http'
import { inject } from "@adonisjs/core";
import PermissionService from '#apps/users/services/permission_service'
import PermissionPolicy from "#apps/users/policies/permission_policy";

@inject()
export default class PermissionsController {
  constructor(protected permissionService: PermissionService) {}

  async index({ request, bouncer }: HttpContext) {
    await bouncer.with(PermissionPolicy).authorize('view' as never)
    const page = request.input('page', 1)
    const limit = request.input('limit', 10)

    return this.permissionService
      .findAll({ page, limit })
  }
}
