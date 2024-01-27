import User from '#apps/users/models/user'
import {FindAll, FindById} from "#apps/users/contracts/user";

export default class UserService {
  async findAll({ page = 1, size = 10 }: FindAll): Promise<User[]> {
    return User
      .query()
      .paginate(page, size)
  }

  async findById(userId: string, { includeRole }: FindById): Promise<User> {
    return User.query()
      .where('id', userId)
      .if(includeRole, (query) => {
        query.preload('roles', (query) => {
          query.preload('permissions')
        })
      })
      .firstOrFail()
  }
}
