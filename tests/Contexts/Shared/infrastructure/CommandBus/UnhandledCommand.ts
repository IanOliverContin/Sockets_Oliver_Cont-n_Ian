import { Command } from '@Shared/domain/CommandBus/Command'

export class UnhandledCommand implements Command {
  static COMMAND_NAME = 'unhandled.command'
}
