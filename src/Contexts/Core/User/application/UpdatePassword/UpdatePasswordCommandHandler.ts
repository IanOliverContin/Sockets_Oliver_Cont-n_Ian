import { Command } from '@Shared/domain/CommandBus/Command'
import { UpdatePasswordCommand } from './UpdatePasswordCommand'
import { Updater } from './Updater'
import { CommandHandler } from '@Shared/domain/CommandBus/CommandHandler'
import { Id } from '@Core/User/domain/ValueObjects/Id'
import { Password } from '@Core/User/domain/ValueObjects/Password'

export class UpdatePasswordCommandHandler implements CommandHandler<UpdatePasswordCommand> {
  constructor (private readonly updater: Updater) {}

  subscribedTo (): Command {
    return UpdatePasswordCommand
  }

  async handle (command: UpdatePasswordCommand): Promise<void> {
    await this.updater.run(
      new Id(command.id),
      Password.create(command.password)
    )
  }
}
