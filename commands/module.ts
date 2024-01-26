import { BaseCommand } from '@adonisjs/core/ace'
import type { CommandOptions } from '@adonisjs/core/types/ace'

export default class Module extends BaseCommand {
  static commandName = 'module'
  static description = 'Generate a module declaration'

  static options: CommandOptions = {}

  async run() {
    this.logger.info('Let\'s go to create your module')

    const name = await this.prompt.ask('Enter the module name')

    const codemods = await this.createCodemods()
    await codemods.makeUsingStub(import.meta.url, 'route.stub', {
      name
    })

  }
}
