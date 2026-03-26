import { LoginQuery } from './LoginQuery'
import { Login } from './Login'
import { Phone } from '@Core/User/domain/ValueObjects/Phone'
import { Password } from '@Core/User/domain/ValueObjects/Password'
import { Query } from '@Shared/domain/QueryBus/Query'
import { QueryHandler } from '@Shared/domain/QueryBus/QueryHandler'
import { UserResponse } from '../UserResponse'

export class LoginQueryHandler implements QueryHandler<LoginQuery, UserResponse> {
    constructor(private readonly login: Login) { }

    subscribedTo(): Query {
        return LoginQuery
    }

    async handle(command: LoginQuery): Promise<UserResponse> {
        return new UserResponse(await this.login.run(new Phone(command.phone), new Password(command.password)))
    }
}