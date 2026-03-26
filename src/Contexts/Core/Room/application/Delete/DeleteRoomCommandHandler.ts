import { CommandHandler } from "@Shared/domain/CommandBus/CommandHandler";
import { DeleteRoomCommand } from "./DeleteRoomCommand";
import { Command } from "@Shared/domain/CommandBus/Command";
import { Deleter } from "./Deleter";
import { Id } from "@Core/Room/domain/ValueObjects/Id";

export class DeleteRoomCommandHandler implements CommandHandler<DeleteRoomCommand> {
    constructor(private readonly deleter: Deleter) { }

    subscribedTo(): Command {
        return DeleteRoomCommand
    }

    async handle(command: DeleteRoomCommand): Promise<void> {
        await this.deleter.run(new Id(command.id))
    }
}