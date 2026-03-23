import { Command } from '@Shared/domain/CommandBus/Command'

export class CreateUserCommand implements Command {
    constructor(
        readonly id: string,
        readonly name: string,
        readonly phone: string,
        readonly password: string,
    ) { }
}
