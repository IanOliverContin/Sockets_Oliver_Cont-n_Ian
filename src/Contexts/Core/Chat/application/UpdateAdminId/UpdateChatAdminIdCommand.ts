import { Command } from "@Shared/domain/CommandBus/Command";

export class UpdateChatAdminIdCommand implements Command {
    constructor(
        public readonly id: string,
        public readonly adminId: string
    ) { }
}
