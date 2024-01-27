import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'role_user'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.string('role_id')
        .references('id')
        .inTable('roles')
        .onDelete('CASCADE')

      table.string('user_id')
        .references('id')
        .inTable('users')
        .onDelete('CASCADE')

      table.unique(['role_id', 'user_id'])

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
