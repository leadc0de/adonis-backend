import {BasePolicy} from '@adonisjs/bouncer'
import User from '#apps/users/models/user'
import { AuthorizerResponse } from '@adonisjs/bouncer/types'
import { inject } from '@adonisjs/core'
import PermissionResolver from '#apps/shared/services/permissions/permission_resolver'

@inject()
export default class UserPolicy extends BasePolicy {
  constructor(protected permissionResolver: PermissionResolver) {
    super()
  }

  async view(user: User): Promise<AuthorizerResponse> {
    return this.permissionResolver
      .createResolve(user, 'user')
      .verifyAccess('view', 'store', 'update', 'delete')
  }
}
