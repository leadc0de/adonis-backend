import Role from '#apps/users/models/role'
import { FindAll } from '#apps/users/contracts/role'

export default class RoleService {
  async findAll({ page = 1, size = 10 }: FindAll) {
    return Role
      .query()
      .paginate(page, size)
  }
}
