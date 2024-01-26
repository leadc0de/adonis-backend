import {args, BaseCommand} from '@adonisjs/core/ace'
import type { CommandOptions } from '@adonisjs/core/types/ace'
import modules from "#config/module";

export default class Validator extends BaseCommand {
  static commandName = 'validator'
  static description = ''

  @args.string({
    description: 'The name of the validator'
  })
  declare name: string

  static options: CommandOptions = {}

  async run() {
    this.logger.info('Hello world from "Validator"')


    const module = await this.prompt.choice('Select module', modules.map((m) => {
      return {
        name: m
      }
    }))

    const codemods = await this.createCodemods()
    await codemods.makeUsingStub(import.meta.url, 'validator.stub', {
      module,
      name: this.name
    })
  }
}
