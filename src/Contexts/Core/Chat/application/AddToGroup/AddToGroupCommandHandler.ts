import { CommandHandler } from "@Shared/domain/CommandBus/CommandHandler";
import { AddToGroupCommand } from "./AddToGroupCommand";
import { Command } from "@Shared/domain/CommandBus/Command";
import { Add } from "./Add";
import { Id } from "@Core/Chat/domain/ValueObjects/Id";
import { AdminId } from "@Core/Chat/domain/ValueObjects/AdminId";
import { Phone } from "@Core/Chat/domain/ValueObjects/Phone";

export class AddToGroupCommandHandler implements CommandHandler<AddToGroupCommand> {
    constructor(private readonly add: Add) { }

    subscribedTo(): Command {
        return AddToGroupCommand
    }

    async handle(data: AddToGroupCommand): Promise<void> {
        await this.add.run(
            new Id(data.id),
            new AdminId(data.adminId),
            data.phones.map((phone) => new Phone(phone))
        )
    }
}