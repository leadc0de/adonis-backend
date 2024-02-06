import { BaseSeeder } from '@adonisjs/lucid/seeders'
import User from '#apps/users/models/user'

export default class extends BaseSeeder {
  async run() {
    // Write your database queries inside the run method

    await User.create({
      email: 'nathael.bonnal@gmail.com',
      firstname: 'Nathael',
      lastname: 'Bonnal',
      username: 'nathaelb'
    })
  }
}
