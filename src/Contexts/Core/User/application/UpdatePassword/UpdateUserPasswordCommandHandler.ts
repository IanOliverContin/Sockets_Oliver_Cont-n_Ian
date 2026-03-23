import { CommandHandler } from '@Shared/domain/CommandBus/CommandHandler'
import { UpdateUserPasswordCommand } from './UpdateUserPasswordCommand'
import { Command } from '@Shared/domain/CommandBus/Command'
import { Updater } from './Updater'
import { Id } from '@Core/User/domain/ValueObjects/Id'
import { Password } from '@Core/User/domain/ValueObjects/Password'

export class UpdateUserPasswordCommandHandler implements CommandHandler<UpdateUserPasswordCommand> {
    constructor(private readonly updater: Updater) { }

    subscribedTo(): Command {
        return UpdateUserPasswordCommand
    }

    async handle(command: UpdateUserPasswordCommand): Promise<void> {
        await this.updater.run(new Id(command.id), command.oldPassword, new Password(command.newPassword))
    }
}