import { BaseCommand, args } from '@adonisjs/core/ace'
import modules from '#config/module'

export default class MakeController extends BaseCommand {
  static commandName = 'controller'

  @args.string({
    description: 'The name of the resource'
  })
  declare name: string


  async run () {
    const module = await this.prompt.choice('Select module', modules.map((m) => {
      return {
        name: m
      }
    }))

    const codemods = await this.createCodemods()
    await codemods.makeUsingStub(import.meta.url, 'controller.stub', {
      name: this.name,
      apps: module
    })
  }
}
