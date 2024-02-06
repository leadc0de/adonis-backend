import vine from '@vinejs/vine'
import {Infer} from "@vinejs/vine/types";

/**
 * Validator to validate the payload when creating
 * a new authentication.
 */
export const loginCredentialsValidator = vine.compile(
  vine.object({
    username: vine.string(),
    password: vine.string(),
  })
)

export const registerAuthenticationValidator = vine
  //.withMetaData<{ userId: string }>()
  .compile(
    vine.object({
      email: vine.string(),
      username: vine.string(),
      password: vine.string().trim(),
      firstname: vine.string().trim(),
      lastname: vine.string().trim()
    })
  )

export type RegisterAuthenticationSchema = Infer<typeof registerAuthenticationValidator>
