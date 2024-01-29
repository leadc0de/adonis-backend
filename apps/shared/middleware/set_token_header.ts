import { HttpContext } from '@adonisjs/core/http'
import { NextFn } from '@adonisjs/core/types/http'

export default class SetTokenHeader {
  async handle(ctx: HttpContext, next: NextFn) {
    const token = ctx.request.cookie('token')

    if (token) {
      ctx.request.headers().authorization = `Bearer ${token}`
    }

    await next()
  }
}
