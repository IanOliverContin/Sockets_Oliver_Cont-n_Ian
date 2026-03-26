import { Command } from "@Shared/domain/CommandBus/Command";

export class DeleteRoomCommand implements Command {
    constructor(
        readonly id: string
    ) { }
}