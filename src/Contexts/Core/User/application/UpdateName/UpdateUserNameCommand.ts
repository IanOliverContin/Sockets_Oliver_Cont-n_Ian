import { Command } from '@Shared/domain/CommandBus/Command'

export class UpdateUserNameCommand implements Command {
    constructor(readonly id: string, readonly name: string) { }
}