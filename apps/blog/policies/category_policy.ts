import {BasePolicy} from '@adonisjs/bouncer'
import { AuthorizerResponse } from '@adonisjs/bouncer/types'
import { inject } from '@adonisjs/core'
import PermissionResolver from '#apps/shared/services/permissions/permission_resolver'
import { JwtPayload } from '#apps/authentication/contracts/jwt'
import { HttpContext } from '@adonisjs/core/http'

@inject()
export default class CategoryPolicy extends BasePolicy {
  private payload: JwtPayload

  constructor(private permissionResolver: PermissionResolver, protected ctx: HttpContext) {
    super()
    this.payload = ctx.auth.use('jwt').payload! as JwtPayload
  }

  async before() {
    const isAdmin = await this.permissionResolver
      .createResolve(this.payload.resource_access, 'category')
      .verifyAccess('admin')

    if (isAdmin) {
      return true
    }
  }

  async view(): Promise<AuthorizerResponse> {
    return this.permissionResolver
      .createResolve(this.payload.resource_access, 'category')
      .verifyAccess('view', 'store', 'update', 'delete')
  }

  async store(): Promise<AuthorizerResponse> {
    return this.permissionResolver
      .createResolve(this.payload.resource_access, 'category')
      .verifyAccess('view', 'store')
  }

  async update(): Promise<AuthorizerResponse> {
    return this.permissionResolver
      .createResolve(this.payload.resource_access, 'category')
      .verifyAccess('view', 'update')
  }

  async destroy(): Promise<AuthorizerResponse> {
    return this.permissionResolver
      .createResolve(this.payload.resource_access, 'category')
      .verifyAccess('view', 'delete')
  }
}
