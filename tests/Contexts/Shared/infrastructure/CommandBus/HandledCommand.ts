import { Command } from '@Shared/domain/CommandBus/Command'

export class HandledCommand implements Command {
  static COMMAND_NAME = 'handled.command'
}
