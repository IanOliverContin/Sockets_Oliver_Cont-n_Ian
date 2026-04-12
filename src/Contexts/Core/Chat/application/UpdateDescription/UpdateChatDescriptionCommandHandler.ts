import { CommandHandler } from "@Shared/domain/CommandBus/CommandHandler";
import { UpdateChatDescriptionCommand } from "./UpdateChatDescriptionCommand";
import { Command } from "@Shared/domain/CommandBus/Command";
import { Updater } from "./Updater";
import { Id } from "@Core/Chat/domain/ValueObjects/Id";
import { Description } from "@Core/Chat/domain/ValueObjects/Description";

export class UpdateChatDescriptionCommandHandler implements CommandHandler<UpdateChatDescriptionCommand> {
    constructor(private readonly updater: Updater) { }

    subscribedTo(): Command {
        return UpdateChatDescriptionCommand
    }

    async handle(command: UpdateChatDescriptionCommand): Promise<void> {
        await this.updater.run(
            new Id(command.id),
            new Description(command.description)
        )
    }
}
