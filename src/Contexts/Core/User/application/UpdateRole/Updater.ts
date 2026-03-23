import { UserRepository } from '@Core/User/domain/UserRepository'
import { Id } from '@Core/User/domain/ValueObjects/Id'
import { UserNotFound } from '@Core/User/domain/Errors/UserNotFound'
import { Role } from '@Core/User/domain/ValueObjects/Role'
import { NoMinPoints } from '@Core/User/domain/Errors/NoMinPoints'

const MIN_POINTS_TO_PUBLISHER = 100

export class Updater {
  constructor (private readonly repository: UserRepository) {}

  async run (
    id: Id,
    role: Role
  ) {
    const user = await this.repository.find(id)

    if (!user) throw new UserNotFound(id)

    if (user.points.valueOf() !== MIN_POINTS_TO_PUBLISHER) throw new NoMinPoints(user.points.valueOf())

    const updatedUser = user.updateRole(
      role
    )

    await this.repository.persist(updatedUser)
  }
}
