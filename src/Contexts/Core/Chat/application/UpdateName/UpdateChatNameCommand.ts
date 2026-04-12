import { Command } from "@Shared/domain/CommandBus/Command";

export class UpdateChatNameCommand implements Command {
    constructor(
        public readonly id: string,
        public readonly name: string
    ) { }
}
