import { Command } from "@Shared/domain/CommandBus/Command";

export class CreateRoomCommand implements Command {
    constructor(
        readonly id: string,
        readonly chatId: string,
        readonly userId: string
    ) { }
}