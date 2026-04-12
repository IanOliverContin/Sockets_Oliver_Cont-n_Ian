import { Command } from "@Shared/domain/CommandBus/Command";
import { Nullable } from "@Shared/domain/Nullable";

export class LeaveGroupCommand implements Command {
    constructor(
        public readonly chatId: string,
        public readonly userId: string,
        public readonly newAdminId: Nullable<string>
    ) { }
}
