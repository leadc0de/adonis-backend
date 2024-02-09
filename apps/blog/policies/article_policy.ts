import {BasePolicy} from '@adonisjs/bouncer'
import { AuthorizerResponse } from '@adonisjs/bouncer/types'
import { inject } from '@adonisjs/core'
import PermissionResolver from '#apps/shared/services/permissions/permission_resolver'
import { HttpContext } from '@adonisjs/core/http'
import { JwtPayload } from '#apps/authentication/contracts/jwt'

@inject()
export default class ArticlePolicy extends BasePolicy {
  private payload: JwtPayload

  constructor(protected permissionResolver: PermissionResolver, protected ctx: HttpContext) {
    super()
    this.payload = ctx.auth.use('jwt').payload! as JwtPayload
  }

  async before() {
    const isAdmin = await this.permissionResolver
      .createResolve(this.payload.resource_access, 'article')
      .verifyAccess('admin')

    if (isAdmin) {
      return true
    }
  }

  async view(): Promise<AuthorizerResponse> {
    return this.permissionResolver
      .createResolve(this.payload.resource_access, 'article')
      .verifyAccess('view', 'store', 'update', 'delete')
  }

  async store(): Promise<AuthorizerResponse> {
    return this.permissionResolver
      .createResolve(this.payload.resource_access, 'article')
      .verifyAccess('store')
  }

  async update(): Promise<AuthorizerResponse> {
    return this.permissionResolver
      .createResolve(this.payload.resource_access, 'article')
      .verifyAccess('update')
  }

  async destroy(): Promise<AuthorizerResponse> {
    return this.permissionResolver
      .createResolve(this.payload.resource_access, 'article')
      .verifyAccess('delete')
  }
}
