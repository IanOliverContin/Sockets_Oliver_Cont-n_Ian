import { CommandHandler } from '@Shared/domain/CommandBus/CommandHandler'
import { HandledCommand } from '@Tests/Contexts/Shared/infrastructure/CommandBus/HandledCommand'

export class MyCommandHandler implements CommandHandler<HandledCommand> {
  subscribedTo (): typeof HandledCommand {
    return HandledCommand
  }

  async handle (_command: HandledCommand): Promise<void> {}
}
