import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'article_category'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.uuid('article_id').references('id').inTable('articles').notNullable()
      table.uuid('category_id').references('id').inTable('categories').notNullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
