import { CommandHandler } from "@Shared/domain/CommandBus/CommandHandler";
import { DeleteChatCommand } from "./DeleteChatCommand";
import { Command } from "@Shared/domain/CommandBus/Command";
import { Deleter } from "./Deleter";
import { Id } from "@Core/Chat/domain/ValueObjects/Id";

export class DeleteChatCommandHandler implements CommandHandler<DeleteChatCommand> {
    constructor(private readonly deleter: Deleter) { }

    subscribedTo(): Command {
        return DeleteChatCommand
    }

    async handle(command: DeleteChatCommand): Promise<void> {
        await this.deleter.run(
            new Id(command.id),
            command.userId
        )
    }
}
