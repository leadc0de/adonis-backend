import {allowGuest, BasePolicy} from '@adonisjs/bouncer'
import { AuthorizerResponse } from '@adonisjs/bouncer/types'
import { inject } from '@adonisjs/core'
import PermissionResolver from '#apps/shared/services/permissions/permission_resolver'
import { JwtPayload } from '#apps/authentication/contracts/jwt';
import {HttpContext} from '@adonisjs/core/http';

@inject()
export default class RolePolicy extends BasePolicy {
  protected payload: JwtPayload
  constructor(
    protected permissionResolver: PermissionResolver,
    protected ctx: HttpContext
  ) {
    super()
    this.payload = ctx.auth.use('jwt').payload! as JwtPayload
  }

  async before() {
    const isAdmin = await this.permissionResolver
      .createResolve(this.payload.resource_access, 'api')
      .verifyAccess('admin')
    if (isAdmin) {
      return true
    }
  }

  @allowGuest()
  async view(): Promise<AuthorizerResponse> {
    return this.permissionResolver
      .createResolve(this.payload.resource_access, 'account')
      .verifyAccess('manage-account')
  }

  @allowGuest()
  async store(): Promise<AuthorizerResponse> {
    return this.permissionResolver
      .createResolve(this.payload.resource_access, 'account')
      .verifyAccess('manage-account')
  }

  @allowGuest()
  async update(): Promise<AuthorizerResponse> {
    return this.permissionResolver
      .createResolve(this.payload.resource_access, 'account')
      .verifyAccess('manage-account')
  }

  @allowGuest()
  async destroy(): Promise<AuthorizerResponse> {
    return this.permissionResolver
      .createResolve(this.payload.resource_access, 'account')
      .verifyAccess('manage-account')
  }
}
