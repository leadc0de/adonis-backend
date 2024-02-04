import { BaseSchema } from '@adonisjs/lucid/schema'
import { ArticleState } from '#apps/blog/models/article'

export default class extends BaseSchema {
  protected tableName = 'articles'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary()
      table.string('title').notNullable()
      table.string('slug').notNullable().unique()
      table.string('description').nullable()
      table.jsonb('body').notNullable()
      table.uuid('category_id').references('id').inTable('categories').nullable()
      table.uuid('user_id').references('id').inTable('categories').notNullable()
      table.enum('state', Object.values(ArticleState)).defaultTo(ArticleState.DRAFT)
      table.timestamp('published_at').nullable()
      table.boolean('is_pinned').defaultTo(false)

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
