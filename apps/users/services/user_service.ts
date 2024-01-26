import User from '#apps/users/models/user'

export interface findAllProps {
  page: number
  size: number
}
export default class UserService {
  async findAll({ page = 1, size = 10 }: findAllProps): Promise<User[]> {
    return User
      .query()
      .paginate(page, size)
  }
}
