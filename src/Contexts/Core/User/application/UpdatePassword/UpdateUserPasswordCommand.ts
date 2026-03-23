import { Command } from '@Shared/domain/CommandBus/Command'

export class UpdateUserPasswordCommand implements Command {
    constructor(readonly id: string, readonly oldPassword: string, readonly newPassword: string) { }
}