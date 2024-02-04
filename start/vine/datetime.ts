import { DateTime } from 'luxon'
import vine, { BaseLiteralType, Vine } from '@vinejs/vine'
import { FieldOptions, Validation } from '@vinejs/vine/types'

declare module '@vinejs/vine' {
  interface Vine {
    datetime(): VineDateTime
  }
}

Vine.macro('datetime', function () {
  return new VineDateTime()
})

const isDateTime = vine.createRule((value: unknown, _, field) => {
  try {
    field.mutate(DateTime.fromISO(value as string), field)
  } catch (error) {
    field.report(
      'The {{ field }} field value must be a datetime',
      'money',
      field
    )
  }
})


export class VineDateTime extends BaseLiteralType<DateTime, DateTime> {
  constructor(options?: FieldOptions, validations?: Validation<any>[]) {
    super(options, validations || [isDateTime()])
  }

  clone() {
    return new VineDateTime() as this
  }
}
