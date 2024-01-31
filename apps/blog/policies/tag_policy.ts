import {BasePolicy} from '@adonisjs/bouncer'
import User from '#apps/users/models/user'
import { AuthorizerResponse } from '@adonisjs/bouncer/types'
import { inject } from '@adonisjs/core'
import PermissionResolver from '#apps/shared/services/permissions/permission_resolver'

@inject()
export default class TagPolicy extends BasePolicy {
  constructor(protected permissionResolver: PermissionResolver) {
    super()
  }

  async view(user: User): Promise<AuthorizerResponse> {
    return this.permissionResolver
      .createResolve(user, 'tag')
      .verifyAccess('view', 'store', 'update', 'delete')
  }

  async store(user: User): Promise<AuthorizerResponse> {
    return this.permissionResolver
      .createResolve(user, 'tag')
      .verifyAccess('view', 'store')
  }

  async update(user: User): Promise<AuthorizerResponse> {
    return this.permissionResolver
      .createResolve(user, 'tag')
      .verifyAccess('view', 'update')
  }

  async destroy(user: User): Promise<AuthorizerResponse> {
    return this.permissionResolver
      .createResolve(user, 'tag')
      .verifyAccess('view', 'delete')
  }
}
