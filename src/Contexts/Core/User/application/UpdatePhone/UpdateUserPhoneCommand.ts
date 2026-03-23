import { Command } from '@Shared/domain/CommandBus/Command'

export class UpdateUserPhoneCommand implements Command {
    constructor(readonly id: string, readonly phone: string) { }
}