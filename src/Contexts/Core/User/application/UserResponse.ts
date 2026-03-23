import { User } from '../domain/User'
import { QueryResponse } from '@Shared/domain/QueryBus/QueryResponse'

export type UserResponseBody = {
  readonly id: string
  readonly name: string
  readonly username: string
  readonly email: string
  readonly role: string
  readonly points: number
  readonly wallet: number
  readonly createdAt: Date
  readonly updatedAt: Date
}

export class UserResponse implements QueryResponse<UserResponseBody> {
  response: UserResponseBody

  constructor (user: User) {
    this.response = {
      id: user.id.valueOf(),
      name: user.name.valueOf(),
      username: user.username.valueOf(),
      email: user.email.valueOf(),
      role: user.role.valueOf() as unknown as string,
      points: user.points.valueOf(),
      wallet: user.wallet.valueOf(),
      createdAt: user.createdAt.valueOf(),
      updatedAt: user.updatedAt.valueOf()
    }
  }
}
