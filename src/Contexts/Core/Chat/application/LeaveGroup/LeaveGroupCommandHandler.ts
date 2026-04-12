import { CommandHandler } from "@Shared/domain/CommandBus/CommandHandler";
import { LeaveGroupCommand } from "./LeaveGroupCommand";
import { Command } from "@Shared/domain/CommandBus/Command";
import { Leaver } from "./Leaver";
import { Id } from "@Core/Chat/domain/ValueObjects/Id";
import { AdminId } from "@Core/Chat/domain/ValueObjects/AdminId";

export class LeaveGroupCommandHandler implements CommandHandler<LeaveGroupCommand> {
    constructor(private readonly leaver: Leaver) { }

    subscribedTo(): Command {
        return LeaveGroupCommand
    }

    async handle(command: LeaveGroupCommand): Promise<void> {
        await this.leaver.run(
            new Id(command.chatId),
            command.userId,
            command.newAdminId ? new AdminId(command.newAdminId) : null
        )
    }
}
