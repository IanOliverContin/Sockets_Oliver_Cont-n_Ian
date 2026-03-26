import { CommandHandler } from '@Shared/domain/CommandBus/CommandHandler'
import { CreateChatCommand } from './CreateChatCommand'
import { Command } from '@Shared/domain/CommandBus/Command'
import { Creator } from './Creator'
import { Id } from '@Core/User/domain/ValueObjects/Id'
import { Name } from '@Core/User/domain/ValueObjects/Name'
import { Description } from '@Core/Chat/domain/ValueObjects/Description'
import { IsGroup } from '@Core/Chat/domain/ValueObjects/IsGroup'
import { AdminId } from '@Core/Chat/domain/ValueObjects/AdminId'
import { Phone } from '@Core/Chat/domain/ValueObjects/Phone'

export class CreateChatCommandHandler implements CommandHandler<CreateChatCommand> {
    constructor(private readonly creator: Creator) { }

    subscribedTo(): Command {
        return CreateChatCommand
    }

    async handle(command: CreateChatCommand): Promise<void> {
        await this.creator.run(
            new Id(command.id),
            new Name(command.name),
            new Description(command.description),
            new IsGroup(command.isGroup),
            new AdminId(command.adminId),
            new Phone(command.phone)
        )
    }
}
