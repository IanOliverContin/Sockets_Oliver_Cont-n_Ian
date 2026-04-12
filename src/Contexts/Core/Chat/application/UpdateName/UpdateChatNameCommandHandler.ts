import { CommandHandler } from "@Shared/domain/CommandBus/CommandHandler";
import { UpdateChatNameCommand } from "./UpdateChatNameCommand";
import { Command } from "@Shared/domain/CommandBus/Command";
import { Updater } from "./Updater";
import { Id } from "@Core/Chat/domain/ValueObjects/Id";
import { Name } from "@Core/Chat/domain/ValueObjects/Name";

export class UpdateChatNameCommandHandler implements CommandHandler<UpdateChatNameCommand> {
    constructor(private readonly updater: Updater) { }

    subscribedTo(): Command {
        return UpdateChatNameCommand
    }

    async handle(command: UpdateChatNameCommand): Promise<void> {
        await this.updater.run(
            new Id(command.id),
            new Name(command.name)
        )
    }
}
