import type { HttpContext } from '@adonisjs/core/http'
import ArticleService from '#apps/blog/services/article_service'
import { inject } from '@adonisjs/core'
import { createArticleValidator } from '#apps/blog/validators/article'

@inject()
export default class ArticlesController {
  constructor(private articleService: ArticleService) {}

  /**
   * Display a list of resource
   */
  async index({}: HttpContext) {
    return this.articleService.getAll()
  }

  /**
   * Show individual record
   */
  async show({ params }: HttpContext) {
    return this.articleService.getById(params.id)
  }

  /**
   * Handle form submission for the create action
   */
  async store({ auth, request }: HttpContext) {
    const data = await request.validateUsing(createArticleValidator)
    return this.articleService.create(auth.user!.id, data)
  }

  /**
   * Handle form submission for the edit action
   */
  async update({ params, request }: HttpContext) {
    const article = await this.articleService.getById(params.id)
    const data = await request.validateUsing(createArticleValidator)

    return this.articleService.update(article, data)
  }

  /**
   * Delete record
   */
  async destroy({ params }: HttpContext) {
    const article = await this.articleService.getById(params.id)
    return article.delete()
  }
}
