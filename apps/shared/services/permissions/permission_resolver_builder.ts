import PermissionResolver from '#apps/shared/services/permissions/permission_resolver'
import User from '#apps/users/models/user'

export default class PermissionResolverBuilder {
  constructor (private resolver: PermissionResolver, private user: User, private key: string) {}

  public async verifyAccess(...permissions: string[]): Promise<boolean> {
    const userPermissions = await this.resolver.getPermissions(this.user)
    return permissions
      .map((permission: string) => `${this.key}:${permission}`)
      .some(permission => userPermissions.includes(permission))
  }
}
