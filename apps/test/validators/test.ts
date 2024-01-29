import vine from '@vinejs/vine'
import { Infer } from '@vinejs/vine/types'

/**
 * Validator to validate the payload when creating
 * a new test.ts.
 */
export const createTestValidator = vine.compile(
  vine.object({})
)

/**
 * Validator to validate the payload when updating
 * an existing test.ts.
 */
export const updateTestValidator = vine.compile(
  vine.object({})
)

export type CreateTestSchema = Infer<typeof createTestValidator>
export type UpdateTestSchema = Infer<typeof updateTestValidator>