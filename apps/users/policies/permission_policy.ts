import {allowGuest, BasePolicy} from '@adonisjs/bouncer'
import { AuthorizerResponse } from '@adonisjs/bouncer/types'
import { inject } from '@adonisjs/core'
import PermissionResolver from '#apps/shared/services/permissions/permission_resolver'
import {JWTPayloadData} from "#apps/authentication/guards/jwt_guard";
import {HttpContext} from "@adonisjs/core/http";

@inject()
export default class PermissionPolicy extends BasePolicy {
  protected payload: JWTPayloadData
  constructor(
    protected permissionResolver: PermissionResolver,
    protected ctx: HttpContext
  ) {
    super()
    this.payload = ctx.auth.use('jwt').payload!
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
}
