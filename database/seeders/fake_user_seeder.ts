import { BaseSeeder } from '@adonisjs/lucid/seeders'
import User from '#apps/users/models/user'

export default class extends BaseSeeder {
  async run() {
    // Write your database queries inside the run method

    await User.create({
      id: '9b12bff7-aa2a-4e96-afe2-2b9fe72bdb2c',
      email: 'nathael.bonnal@gmail.com',
      firstname: 'Nathael',
      lastname: 'Bonnal',
      username: 'nathaelb'
    })
  }
}
