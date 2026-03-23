import { CommandHandler } from '@Shared/domain/CommandBus/CommandHandler'
import { UpdateUserNameCommand } from './UpdateUserNameCommand'
import { Command } from '@Shared/domain/CommandBus/Command'
import { Updater } from './Updater'
import { Id } from '@Core/User/domain/ValueObjects/Id'
import { Name } from '@Core/User/domain/ValueObjects/Name'

export class UpdateUserNameCommandHandler implements CommandHandler<UpdateUserNameCommand> {
    constructor(private readonly updater: Updater) { }

    subscribedTo(): Command {
        return UpdateUserNameCommand
    }

    async handle(command: UpdateUserNameCommand): Promise<void> {
        await this.updater.run(new Id(command.id), new Name(command.name))
    }
}