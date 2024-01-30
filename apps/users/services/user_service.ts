import User from '#apps/users/models/user'
import {FindAll, FindById} from "#apps/users/contracts/user";
import {CreateUserSchema} from "#apps/users/validators/user";
import db from "@adonisjs/lucid/services/db";

export default class UserService {
  async findAll({ page = 1, size = 10, includeRole }: FindAll): Promise<User[]> {
    return User
      .query()
      .if(includeRole, (query) => {
        query.preload('roles', (query) => {
          query.preload('permissions')
        })
      })
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

  async create(payload: CreateUserSchema): Promise<User> {
    return await db.transaction(async (trx): Promise<User> => {
      const user = await User.create(payload, {
        client: trx
      })

      if (payload.roleIds) {
        await user.related('roles').attach(payload.roleIds, trx)
      }

      return user
    })
  }
}
