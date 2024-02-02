import { BaseModel, beforeCreate, column } from '@adonisjs/lucid/orm'
import { DateTime } from 'luxon'
import { randomUUID } from 'node:crypto'

export enum ArticleState {
  PUBLISHED = 'published',
  DRAFT = 'draft',
}

export default class Article extends BaseModel {
  @column({ isPrimary: true })
  declare id: string

  @column()
  declare title: string

  @column()
  declare slug: string

  @column()
  declare description: string

  @column()
  declare body: { [key: string]: unknown }

  @column()
  declare state: ArticleState

  @column()
  declare publishedAt: DateTime | null

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime | null

  @beforeCreate()
  public static async generateUuid(model: Article) {
    if (model.$dirty.id) {
      model.id = randomUUID()
    }
  }
}
