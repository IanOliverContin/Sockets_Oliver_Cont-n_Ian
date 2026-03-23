import { CommandHandler } from '@Shared/domain/CommandBus/CommandHandler'
import { LoginQuery } from './LoginQuery'
import { Command } from '@Shared/domain/CommandBus/Command'
import { Login } from './Login'
import { Phone } from '@Core/User/domain/ValueObjects/Phone'
import { Password } from '@Core/User/domain/ValueObjects/Password'

export class LoginQueryHandler implements CommandHandler<LoginQuery> {
    constructor(private readonly login: Login) { }

    subscribedTo(): Command {
        return LoginQuery
    }

    async handle(command: LoginQuery): Promise<void> {
        await this.login.run(new Phone(command.phone), new Password(command.password))
    }
}