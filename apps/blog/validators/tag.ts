import vine from '@vinejs/vine'
import { Infer } from '@vinejs/vine/types'

/**
 * Validator to validate the payload when creating
 * a new tag.ts.
 */
export const createTagValidator = vine.compile(
  vine.object({
    label: vine.string().trim(),
    textColor: vine.string().trim(),
    bgColor: vine.string().trim(),
  })
)

/**
 * Validator to validate the payload when updating
 * an existing tag.ts.
 */
export const updateTagValidator = vine.compile(
  vine.object({
    label: vine.string().trim().optional(),
    textColor: vine.string().trim().optional(),
    bgColor: vine.string().trim().optional(),
  })
)

export type CreateTagSchema = Infer<typeof createTagValidator>
export type UpdateTagSchema = Infer<typeof updateTagValidator>
