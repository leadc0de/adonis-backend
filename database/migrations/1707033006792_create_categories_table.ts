import { BaseSchema } from '@adonisjs/lucid/schema'
import { CategoryState } from '#apps/blog/models/category'
import { ArticleState } from '#apps/blog/models/article'

export default class extends BaseSchema {
  protected tableName = 'categories'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary()
      table.string('name').notNullable()
      table.string('slug').notNullable().unique()
      table.string('description').nullable()
      table.string('thumbnail').nullable()
      table.string('icon').nullable()
      table.enum('state', Object.values(CategoryState)).defaultTo(ArticleState.DRAFT)
      table.timestamp('visible_at').nullable()

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
