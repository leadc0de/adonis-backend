import {BasePolicy} from '@adonisjs/bouncer'
import User from '#apps/users/models/user'
import { AuthorizerResponse } from '@adonisjs/bouncer/types'
import { inject } from '@adonisjs/core'
import PermissionResolver from '#apps/shared/services/permission_resolver'

@inject()
export default class UserPolicy extends BasePolicy {
  constructor(protected permissionResolver: PermissionResolver) {
    super()
  }

  async view(user: User): Promise<AuthorizerResponse> {
    const permissions = await this.permissionResolver.getPermissions(user)
    return this.permissionResolver
      .verifyAccess(
        permissions,
        'user',
        'view', 'store', 'update', 'delete'
      )
  }
}
