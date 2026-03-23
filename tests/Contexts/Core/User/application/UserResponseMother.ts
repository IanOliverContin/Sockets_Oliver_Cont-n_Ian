import { User } from '@Core/User/domain/User'
import { UserResponse } from '@Core/User/application/UserResponse'

export class UserResponseMother {
  static create (user: User): UserResponse {
    return new UserResponse(user)
  }
}
