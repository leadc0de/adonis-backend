import User from "#apps/users/models/user";
import PermissionResolverBuilder from '#apps/shared/services/permissions/permission_resolver_builder'
import { ResourceAccess } from '#apps/authentication/contracts/jwt'

export default class PermissionResolver {
  async getPermissions(user: User) {
    const permissions: string[] = []

    await user.load('roles', (query) => {
      query.preload('permissions')
    })

    user.roles.forEach((role) => {
      role.permissions.forEach((permission) => {
        if (!permissions.includes(permission.identifier)) {
          permissions.push(permission.identifier)
        }
      })
    })

    return permissions
  }

  async getResourceAccess(data: ResourceAccess, key: string): Promise<string[]> {
    return data[key]?.roles ?? []
  }

  public createResolve(resourceAccess: ResourceAccess, key: string): PermissionResolverBuilder {
    return new PermissionResolverBuilder(this, resourceAccess, key)
  }
}
