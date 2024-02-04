import Article, { ArticleState } from '#apps/blog/models/article'
import { CategoryState } from '#apps/blog/models/category'
import { CreateArticleSchema, UpdateArticleSchema } from '#apps/blog/validators/article'
import db from '@adonisjs/lucid/services/db'

export default class ArticleService {
  public async getAll () {
    return Article.query()
  }

  public async getAllPublished () {
    return Article.query()
      .where('state', ArticleState.PUBLISHED)
      .andWhereHas('category', (query) => {
        query.where('state', CategoryState.PUBLISHED)
      })
      .andWhere((query) => query
        .whereNull('published_at')
        .orWhere('published_at', '<', new Date())
      )
  }

  public async getById (id: Article['id']) {
    return Article.query()
      .where('id', id)
      .firstOrFail()
  }

  public async create (authorId: string, schema: CreateArticleSchema) {
    return db.transaction(async (trx) => {
      const article = await Article.create({
        ...schema,
        userId: authorId,
      }, { client: trx })

      await article.useTransaction(trx).related('tags').sync(schema.tagIds)

      return article
    })
  }

  public async update (article: Article, schema: UpdateArticleSchema) {
    return db.transaction(async (trx) => {
      await article.useTransaction(trx)
        .merge(schema)
        .save()

      await article.related('tags').sync(schema.tagIds)
      return article
    })
  }
}
