import vine from '@vinejs/vine'
import { Infer } from '@vinejs/vine/types'
import { CategoryState } from '#apps/blog/models/category'

const allowedFileExtnames: string[] = ['png', 'jpeg', 'jpg', 'webp']
const allowedMaFileSize: string = '2mb'

const requiredOnPublishFields = vine.group([
  vine.group.if((data) => data.state === 'published', {
    name: vine.string().trim(),
    description: vine.string().trim(),
    icon: vine.file({ extnames: allowedFileExtnames, size: allowedMaFileSize }),
    thumbnail: vine.file({ extnames: allowedFileExtnames, size: allowedMaFileSize }),
  }),
  vine.group.else({
    name: vine.string().trim().optional(),
    description: vine.string().trim().optional(),
    icon: vine.file({ extnames: allowedFileExtnames, size: allowedMaFileSize }).nullable().optional(),
    thumbnail: vine.file({ extnames: allowedFileExtnames, size: allowedMaFileSize }).nullable().optional(),
  })
])

/**
 * Validator to validate the payload when creating
 * a new category.ts.
 */
export const createCategoryValidator = vine.compile(
  vine.object({
    state: vine.enum(CategoryState),
    visibleAt: vine.date().optional()
  }).merge(requiredOnPublishFields)
)

/**
 * Validator to validate the payload when updating
 * an existing category.ts.
 */
export const updateCategoryValidator = vine.compile(
  vine.object({
    state: vine.enum(CategoryState),
    visibleAt: vine.date().optional()
  }).merge(requiredOnPublishFields)
)

export type CreateCategorySchema = Infer<typeof createCategoryValidator>
export type UpdateCategorySchema = Infer<typeof updateCategoryValidator>
