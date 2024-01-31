import type { HttpContext } from '@adonisjs/core/http'
import TagService from '#apps/blog/services/tag_service'
import { inject } from '@adonisjs/core'
import RolePolicy from '#apps/users/policies/role_policy'
import TagPolicy from '#apps/blog/policies/tag_policy'
import { createTagValidator } from '#apps/blog/validators/tag_validator'
import Tag from '#apps/blog/models/tag'

@inject()
export default class TagsController {
  constructor (private tagService: TagService) {}

  /**
   * Display a list of resource
   */
  async index({ bouncer, request }: HttpContext) {
    await bouncer.with(RolePolicy).authorize('view' as never)

    const page = request.input('page', 1)
    const limit = request.input('limit', 10)

    return this.tagService.findAll({ page, limit })
  }

  /**
   * Show individual record
   */
  async show({ bouncer, params }: HttpContext) {
    await bouncer.with(RolePolicy).authorize('view' as never)
    return this.tagService.findById(params.id)
  }

  /**
   * Handle form submission for the create action
   */
  async store({ bouncer, request }: HttpContext): Promise<Tag> {
    await bouncer.with(TagPolicy).authorize('store' as never)

    const data = await request.validateUsing(createTagValidator)
    return this.tagService.create(data)
  }

  /**
   * Handle form submission for the edit action
   */
  async update({ bouncer, request, params }: HttpContext): Promise<Tag> {
    await bouncer.with(TagPolicy).authorize('update' as never)

    const tag = await this.tagService.findById(params.id)
    const data = await request.validateUsing(createTagValidator)
    return this.tagService.update(tag, data)
  }

  /**
   * Delete record
   */
  async destroy({ bouncer, params }: HttpContext): Promise<void> {
    await bouncer.with(TagPolicy).authorize('destroy' as never)

    const tag = await this.tagService.findById(params.id)
    await this.tagService.destroy(tag)
  }
}
