import { Command } from "@Shared/domain/CommandBus/Command";

export class CreateChatCommand implements Command {
    constructor(
        public readonly id: string,
        public readonly name: string,
        public readonly description: string,
        public readonly isGroup: boolean,
        public readonly adminId: string,
        public readonly phone: string
    ) { }
} 