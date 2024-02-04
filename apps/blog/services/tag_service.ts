import db from '@adonisjs/lucid/services/db'
import { TransactionClientContract } from '@adonisjs/lucid/types/database'
import Tag from '#apps/blog/models/tag'
import { CreateTagSchema, UpdateTagSchema } from '#apps/blog/validators/tag'
import { FindAll } from '#apps/users/contracts/role'

export default class TagService {
  async findAll({ page = 1, limit = 10 }: FindAll) {
    return Tag
      .query()
      .paginate(page, limit)
  }

  async findById(tagId: Tag['id']) {
    return Tag.query()
      .where('id', tagId)
      .firstOrFail()
  }

  async create (schema: CreateTagSchema): Promise<Tag> {
    return db.transaction(async (trx: TransactionClientContract): Promise<Tag> => {
      return Tag.create(schema, { client: trx })
    })
  }

  async update (tag: Tag, schema: UpdateTagSchema): Promise<Tag> {
    return tag.merge(schema).save()
  }

  async destroy (tag: Tag): Promise<void> {
    await tag.delete()
  }
}
