import { BaseCommand } from '@adonisjs/core/ace'
import type { CommandOptions } from '@adonisjs/core/types/ace'
import string from '@adonisjs/core/helpers/string'

const STUBS_ROOT = new URL('./stubs', import.meta.url)

export default class Module extends BaseCommand {
  static commandName = 'make:module'
  static description = 'Generate a module declaration'

  static options: CommandOptions = {}

  async run() {
    this.logger.info('Let\'s go to create your module')

    const name = await this.prompt.ask('Enter the module name')

    const codemods = await this.createCodemods()

    await Promise.all([
      codemods.makeUsingStub(STUBS_ROOT.pathname, 'route.stub', { name }),
      codemods.makeUsingStub(STUBS_ROOT.pathname, 'controller.stub', {
        name,
        controllerName: string.pascalCase(name + 'Controller'),
        controllerFileName: `${string.pluralize(name)}_controllers.ts`,
      }),
      codemods.makeUsingStub(STUBS_ROOT.pathname, 'validator.stub', {
        name,
        validatorName: string.pascalCase(name + 'Validator'),
        validatorFileName: `${string.pluralize(name)}_validator.ts`,
        createAction: string.camelCase('create' + name + 'Validator'),
        updateAction: string.camelCase('update' + name + 'Validator'),
      }),
      codemods.makeUsingStub(STUBS_ROOT.pathname, 'service.stub', {
        name,
      })
    ])

  }
}
