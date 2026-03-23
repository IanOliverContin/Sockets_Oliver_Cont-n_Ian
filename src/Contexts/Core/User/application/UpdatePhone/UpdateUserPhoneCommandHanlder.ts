import { CommandHandler } from '@Shared/domain/CommandBus/CommandHandler'
import { UpdateUserPhoneCommand } from './UpdateUserPhoneCommand'
import { Command } from '@Shared/domain/CommandBus/Command'
import { Updater } from './Updater'
import { Id } from '@Core/User/domain/ValueObjects/Id'
import { Phone } from '@Core/User/domain/ValueObjects/Phone'

export class UpdateUserPhoneCommandHanlder implements CommandHandler<UpdateUserPhoneCommand> {
    constructor(private readonly updater: Updater) { }

    subscribedTo(): Command {
        return UpdateUserPhoneCommand
    }

    async handle(command: UpdateUserPhoneCommand): Promise<void> {
        await this.updater.run(new Id(command.id), new Phone(command.phone))
    }
}