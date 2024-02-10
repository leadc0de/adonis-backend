import { BaseSeeder } from '@adonisjs/lucid/seeders'
import User from '#apps/users/models/user'

export default class extends BaseSeeder {
  async run() {
    // Write your database queries inside the run method

    await User.create({
      id: 'decb2de2-4aeb-45c7-bf4d-a83ef4aaf0c4',
      email: 'nathael.bonnal@gmail.com',
      firstname: 'Nathael',
      lastname: 'Bonnal',
      username: 'nathaelb'
    })
  }
}
