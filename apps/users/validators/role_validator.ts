import vine from '@vinejs/vine'
import { Infer } from '@vinejs/vine/types'

const permissionValidation = {
  permissions: vine.array(vine
    .string()
    .exists(async (db, value) => {
      const role = await db.from('roles')
        .select('id')
        .where('id', value)
        .first()

      return !!role
    })
  ).optional()
}

/**
 * Validator to validate the payload when creating
 * a new role.
 */
export const storeRoleValidator = vine.compile(
  vine.object({
    label: vine.string().trim(),
    description: vine.string().trim().optional(),
    power: vine.number().range([0, 100]),
    ...permissionValidation
  })
)

/**
 * Validator to validate the payload when updating
 * an existing role.
 */
export const updateRoleValidator = vine.compile(
  vine.object({
    label: vine.string().trim().optional(),
    description: vine.string().trim().optional(),
    power: vine.number().range([0, 100]).optional(),
    ...permissionValidation
  })
)

export type StoreRoleSchema = Infer<typeof storeRoleValidator>
export type UpdateRoleSchema = Infer<typeof updateRoleValidator>
