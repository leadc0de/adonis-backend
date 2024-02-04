import vine from '@vinejs/vine'
import { Infer } from '@vinejs/vine/types'
import { ArticleState } from '#apps/blog/models/article'
import Category from '#apps/blog/models/category'

const descriptionField = vine.string()
  .trim()
  .minLength(10)
  .maxLength(255)

const categoryId = vine.string().trim().exists(async (db, value, _) => {
  const category = await db.from(Category.name)
    .where('id', value)
    .firstOrFail()

  return !!category
})

const requiredOnPublishFields = vine.group([
  vine.group.if((data) => data.state === ArticleState.PUBLISHED, {
    description: descriptionField,
    body: vine.any()
  }),
  vine.group.else({
    description: descriptionField.optional(),
    body: vine.any().optional()
  })
])

/**
 * Validator to validate the payload when creating
 * a new article.ts.
 */
export const createArticleValidator = vine.compile(
  vine.object({
    title: vine.string().trim(),
    categoryId: categoryId.nullable(),
    publishedAt: vine.datetime().nullable(),
    isPinned: vine.boolean(),
    state: vine.enum(ArticleState),
  }).merge(requiredOnPublishFields)
)

/**
 * Validator to validate the payload when updating
 * an existing article.ts.
 */
export const updateArticleValidator = vine.compile(
  vine.object({
    title: vine.string().trim(),
    categoryId: categoryId.nullable(),
    publishedAt: vine.datetime().nullable(),
    isPinned: vine.boolean(),
    state: vine.enum(ArticleState),
  }).merge(requiredOnPublishFields)
)

export type CreateArticleSchema = Infer<typeof createArticleValidator>
export type UpdateArticleSchema = Infer<typeof updateArticleValidator>
