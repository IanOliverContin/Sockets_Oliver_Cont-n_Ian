import { User } from '../domain/User'
import { QueryResponse } from '@Shared/domain/QueryBus/QueryResponse'

export type UserResponseBody = {
    readonly id: string
    readonly name: string
    readonly phone: string
    readonly createdAt: Date
    readonly updatedAt: Date
    readonly deletedAt: Date | null
}

export class UserResponse implements QueryResponse<UserResponseBody> {
    response: UserResponseBody

    constructor(user: User) {
        this.response = {
            id: user.id.valueOf(),
            name: user.name.valueOf(),
            phone: user.phone.valueOf(),
            createdAt: user.createdAt.valueOf(),
            updatedAt: user.updatedAt.valueOf(),
            deletedAt: user.deletedAt?.valueOf() ?? null
        }
    }
}
