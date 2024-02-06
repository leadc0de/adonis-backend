import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Role from "#apps/users/models/role";
import Permission from "#apps/users/models/permission";

export default class extends BaseSeeder {
  async run() {
    const adminPermission = await Permission.create({
      identifier: 'admin'
    })
    const admin = await Role.findByOrFail('label', 'Administrateur')

    await admin.related('permissions').attach([adminPermission.id])


  }
}
