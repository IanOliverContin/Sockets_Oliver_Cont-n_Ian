import { Command } from '@Shared/domain/CommandBus/Command'
import { UpdateRoleCommand } from './UpdateRoleCommand'
import { Updater } from './Updater'
import { CommandHandler } from '@Shared/domain/CommandBus/CommandHandler'
import { Id } from '@Core/User/domain/ValueObjects/Id'
import { Role } from '@Core/User/domain/ValueObjects/Role'

export class UpdateRoleCommandHandler implements CommandHandler<UpdateRoleCommand> {
  constructor (private readonly updater: Updater) {}

  subscribedTo (): Command {
    return UpdateRoleCommand
  }

  async handle (command: UpdateRoleCommand): Promise<void> {
    await this.updater.run(
      new Id(command.id),
      new Role(command.role)
    )
  }
}
