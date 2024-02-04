import type { HttpContext } from '@adonisjs/core/http'
import CategoryService from '#apps/blog/services/category_service'
import { createCategoryValidator, updateCategoryValidator } from '#apps/blog/validators/category'
import { inject } from '@adonisjs/core'
import Category from '#apps/blog/models/category'
import CategoryPolicy from '#apps/blog/policies/category_policy'

@inject()
export default class CategoriesController {
  constructor (private categoryService: CategoryService) {
  }

  /**
   * Display a list of resource
   */
  async index({ bouncer, request }: HttpContext) {
    await bouncer.with(CategoryPolicy).authorize('view' as never)

    const page = request.input('page', 1)
    const limit = request.input('limit', 10)

    return this.categoryService.findAll({ page, limit })
  }

  /**
   * Show individual record
   */
  async show({ bouncer, params }: HttpContext) {
    await bouncer.with(CategoryPolicy).authorize('view' as never)
    return this.categoryService.findById(params.id)
  }

  /**
   * Handle form submission for the create action
   */
  async store({ bouncer, request }: HttpContext): Promise<Category> {
    await bouncer.with(CategoryPolicy).authorize('store' as never)

    const data = await request.validateUsing(createCategoryValidator)
    return this.categoryService.create(data)
  }

  /**
   * Handle form submission for the edit action
   */
  async update({ bouncer, params, request }: HttpContext) {
    await bouncer.with(CategoryPolicy).authorize('update' as never)
    const data = await request.validateUsing(updateCategoryValidator)

    const category = await Category.query()
      .where('id', params.id)
      .firstOrFail()

    return this.categoryService.update(category, data)
  }

  /**
   * Delete record
   */
  async destroy({ bouncer, params }: HttpContext) {
    await bouncer.with(CategoryPolicy).authorize('destroy' as never)
    const category = await Category.findOrFail(params.id)
    await this.categoryService.destroy(category)
  }
}
