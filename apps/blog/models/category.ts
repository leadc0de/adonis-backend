import { BaseModel, beforeCreate, column } from '@adonisjs/lucid/orm'
import { DateTime } from 'luxon'
import { randomUUID } from 'node:crypto'

export enum CategoryState {
  DRAFT = 'draft',
  PUBLISHED = 'published'
}

export default class Category extends BaseModel {
  @column({ isPrimary: true })
  declare id: string

  @column()
  declare slug: string

  @column()
  declare name: string

  @column()
  declare description: string | null

  @column()
  declare thumbnail: string | null

  @column()
  declare icon: string | null

  @column()
  declare state: CategoryState

  @column.dateTime()
  declare visibleAt: DateTime | null

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime | null

  @beforeCreate()
  public static async generateUuid(model: Category) {
    if (model.$dirty.id) {
      model.id = randomUUID()
    }
  }
}
