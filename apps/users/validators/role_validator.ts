import vine from '@vinejs/vine'
import { Infer } from '@vinejs/vine/types'

/**
 * Validator to validate the payload when creating
 * a new role.
 */
export const storeRoleValidator = vine.compile(
  vine.object({
    label: vine.string().trim(),
    power: vine.number().range([0, 100]),
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
  })
)

/**
 * Validator to validate the payload when updating
 * an existing role.
 */
export const updateRoleValidator = vine.compile(
  vine.object({})
)

export type StoreRoleSchema = Infer<typeof storeRoleValidator>
export type UpdateRoleSchema = Infer<typeof updateRoleValidator>
