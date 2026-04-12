import { Command } from "@Shared/domain/CommandBus/Command";

export class DeleteChatCommand implements Command {
    constructor(
        public readonly id: string,
        public readonly userId: string
    ) { }
} 