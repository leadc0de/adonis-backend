import { CreateCategorySchema, UpdateCategorySchema } from '#apps/blog/validators/category_validator'
import { FindAll } from '#apps/users/contracts/role'
import db from '@adonisjs/lucid/services/db'
import { TransactionClientContract } from '@adonisjs/lucid/types/database'
import Category from '#apps/blog/models/category'
import { DateTime } from 'luxon'

export default class CategoryService {
  private baseIconS3 = `blog/categories`

  async findAll({ page = 1, limit = 10 }: FindAll) {
    return Category.query()
      .paginate(page, limit)
  }

  async findById(categoryId: Category['id']): Promise<Category> {
    return Category.query()
      .where('id', categoryId)
      .firstOrFail()
  }

  public async create(schema: CreateCategorySchema) {
    return db.transaction(async (trx: TransactionClientContract): Promise<Category> => {
      const category = await Category.create({
        name: schema.name,
        description: schema.description,
        state: schema.state,
        visibleAt: schema.visibleAt ? DateTime.fromJSDate(schema.visibleAt) : null
      }, { client: trx })

      // Todo add icon and thumbnail uploads in s3

      return category.merge({
        icon: schema.icon ? `${this.baseIconS3}/icons/${category.id}.${schema.icon?.extname}` : null,
        thumbnail: schema.thumbnail ? `${this.baseIconS3}/thumbnails/${category.id}.${schema.thumbnail?.extname}` : null,
      }).save()
    })
  }

  public async update(category: Category, schema: UpdateCategorySchema) {
    return db.transaction(async (trx: TransactionClientContract): Promise<Category> => {
      const payload: { [key: string]: unknown } = { ...schema }

      if (schema.icon !== undefined) {
        // Todo add file upload
        payload.icon = schema.icon
          ? `${this.baseIconS3}/icons/${category.id}.${schema.icon?.extname}`
          : null
      }

      if (schema.thumbnail !== undefined) {
        // Todo add file upload
        payload.thumbnail = schema.thumbnail
          ? `${this.baseIconS3}/thumbnails/${category.id}.${schema.icon?.extname}`
          : null
      }

      return category.useTransaction(trx).merge(payload).save()
    })
  }

  public async destroy(category: Category): Promise<void> {
    // Todo remove attached files
    return category.delete()
  }
}
