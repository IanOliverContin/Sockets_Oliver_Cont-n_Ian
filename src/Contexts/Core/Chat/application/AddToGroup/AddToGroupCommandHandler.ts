import { CommandHandler } from "@Shared/domain/CommandBus/CommandHandler";
import { AddToGroupCommand } from "./AddToGroupCommand";
import { Command } from "@Shared/domain/CommandBus/Command";
import { Add } from "./Add";
import { Id } from "@Core/Chat/domain/ValueObjects/Id";
import { AdminId } from "@Core/Chat/domain/ValueObjects/AdminId";
import { Phone } from "@Core/User/domain/ValueObjects/Phone";

export class AddToGroupCommandHandler implements CommandHandler<AddToGroupCommand> {
    constructor(private readonly adder: Add) { }

    subscribedTo(): Command {
        return AddToGroupCommand
    }

    async handle(command: AddToGroupCommand): Promise<void> {
        await this.adder.run(
            new Id(command.id),
            new AdminId(command.adminId),
            command.phones.map(phone => new Phone(phone))
        )
    }
}