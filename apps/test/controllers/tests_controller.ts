import type { HttpContext } from '@adonisjs/core/http'
import { inject } from '@adonisjs/core'
import TestService from '#apps/test/services/test_service'

@inject()
export default class TestsController {
  constructor(private testService: TestService) {}

  /**
   * Display a list of resource
   */
  async index({}: HttpContext) {}

  /**
   * Handle form submission for the create action
   */
  async store({ request }: HttpContext) {}

  /**
   * Show individual record
   */
  async show({ params }: HttpContext) {}

  /**
   * Handle form submission for the edit action
   */
  async update({ params, request }: HttpContext) {}

  /**
   * Delete record
   */
  async destroy({ params }: HttpContext) {}
}