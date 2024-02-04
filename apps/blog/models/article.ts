import { BaseModel, beforeCreate, belongsTo, column, manyToMany } from '@adonisjs/lucid/orm'
import { DateTime } from 'luxon'
import { randomUUID } from 'node:crypto'
import User from '#apps/users/models/user'
import type { BelongsTo, ManyToMany } from '@adonisjs/lucid/types/relations'
import Tag from '#apps/blog/models/tag'
import Category from '#apps/blog/models/category'

export enum ArticleState {
  PUBLISHED = 'published',
  DRAFT = 'draft',
}

export default class Article extends BaseModel {
  @column({ isPrimary: true })
  declare id: string

  @column()
  declare userId: string

  @column()
  declare categoryId: string

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

  @column()
  declare isPinned: boolean

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

  @belongsTo(() => User)
  declare author: BelongsTo<typeof User>

  @belongsTo(() => Category)
  declare category: BelongsTo<typeof Category>

  @manyToMany(() => Tag)
  declare tags: ManyToMany<typeof Tag>
}
