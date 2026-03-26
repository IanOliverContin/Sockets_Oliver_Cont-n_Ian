import { CommandHandler } from "@Shared/domain/CommandBus/CommandHandler";
import { CreateRoomCommand } from "./CreateRoomCommand";
import { Command } from "@Shared/domain/CommandBus/Command";
import { Creator } from "./Creator";
import { Id } from "@Core/Room/domain/ValueObjects/Id";
import { ChatId } from "@Core/Room/domain/ValueObjects/ChatId";
import { UserId } from "@Core/Room/domain/ValueObjects/UserId";

export class CreateRoomCommandHandler implements CommandHandler<CreateRoomCommand> {
    constructor(private readonly creator: Creator) { }

    subscribedTo(): Command {
        return CreateRoomCommand
    }

    async handle(command: CreateRoomCommand): Promise<void> {
        await this.creator.run(
            new Id(command.id),
            new ChatId(command.chatId),
            new UserId(command.userId)
        )
    }
}