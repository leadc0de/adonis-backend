import { BaseModel, beforeCreate, column, manyToMany } from '@adonisjs/lucid/orm'
import Role from '#apps/users/models/role'
import type { ManyToMany } from '@adonisjs/lucid/types/relations'
import { DateTime } from 'luxon'
import { randomUUID } from 'crypto'

export default class Permission extends BaseModel {
  @column({ isPrimary: true })
  declare id: string

  @column()
  declare identifier: string

  @manyToMany(() => Role)
  declare roles: ManyToMany<typeof Role>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @beforeCreate()
  public static async generateUuid (model: Permission) {
    model.id = randomUUID()
  }
}
