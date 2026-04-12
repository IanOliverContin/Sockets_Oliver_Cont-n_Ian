import { Command } from "@Shared/domain/CommandBus/Command";

export class UpdateChatDescriptionCommand implements Command {
    constructor(
        public readonly id: string,
        public readonly description: string
    ) { }
}
