import PermissionResolver from '#apps/shared/services/permissions/permission_resolver'
import {ResourceAccess} from '#apps/authentication/guards/jwt_guard'

export default class PermissionResolverBuilder {
  constructor (
    private resolver: PermissionResolver,
    private resourceAccess: ResourceAccess, private key: string
  ) {}

  public async verifyAccess(...permissions: string[]): Promise<boolean> {
    const userResourcesAccess = await this.resolver.getResourceAccess(this.resourceAccess, this.key)

    return permissions
      .some(permission => userResourcesAccess.includes(permission))
  }
}
