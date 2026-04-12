import { CommandHandler } from "@Shared/domain/CommandBus/CommandHandler";
import { UpdateChatAdminIdCommand } from "./UpdateChatAdminIdCommand";
import { Command } from "@Shared/domain/CommandBus/Command";
import { Updater } from "./Updater";
import { Id } from "@Core/Chat/domain/ValueObjects/Id";
import { AdminId } from "@Core/Chat/domain/ValueObjects/AdminId";

export class UpdateChatAdminIdCommandHandler implements CommandHandler<UpdateChatAdminIdCommand> {
    constructor(private readonly updater: Updater) { }

    subscribedTo(): Command {
        return UpdateChatAdminIdCommand
    }

    async handle(command: UpdateChatAdminIdCommand): Promise<void> {
        await this.updater.run(
            new Id(command.id),
            new AdminId(command.adminId)
        )
    }
}
