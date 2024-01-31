import User from "#apps/users/models/user";
import PermissionResolverBuilder from '#apps/shared/services/permissions/permission_resolver_builder'

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

  public createResolve(user: User, key: string): PermissionResolverBuilder {
    return new PermissionResolverBuilder(this,user, key)
  }
}
