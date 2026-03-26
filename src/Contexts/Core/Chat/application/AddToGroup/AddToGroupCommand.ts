import { Command } from "@Shared/domain/CommandBus/Command";

export class AddToGroupCommand implements Command {
    constructor(
        public readonly id: string,
        public readonly adminId: string,
        public readonly phones: string[]
    ) { }
}