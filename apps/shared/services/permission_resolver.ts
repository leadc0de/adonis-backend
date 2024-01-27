import User from "#apps/users/models/user";

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

  verifyAccess(permissions: string[], key: string, ...attributes: string[]): boolean {
    return attributes
      .map(attribute => `${attribute}:${key}`)
      .some(permission => permissions.includes(permission))
  }

}
