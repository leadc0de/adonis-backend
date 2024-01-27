import {BaseModel, beforeCreate, column, manyToMany} from '@adonisjs/lucid/orm'
import {DateTime} from "luxon";
import {randomUUID} from "crypto";
import User from "#apps/users/models/user";
import type { ManyToMany } from '@adonisjs/lucid/types/relations'
import Permission from "#apps/users/models/permission";

export default class Role extends BaseModel {
  @column({ isPrimary: true })
  declare id: string

  @column()
  declare label: string

  @column()
  declare power: number

  @manyToMany(() => User)
  declare users: ManyToMany<typeof User>

  @manyToMany(() => Permission)
  declare permissions: ManyToMany<typeof Permission>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @beforeCreate()
  public static async generateUuid(model: Role) {
    model.id = randomUUID()
  }
}
