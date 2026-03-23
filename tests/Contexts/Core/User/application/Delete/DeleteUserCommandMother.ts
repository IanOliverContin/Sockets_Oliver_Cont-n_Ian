import { DeleteUserCommand } from '@Core/User/application/Delete/DeleteUserCommand'
import { UuidMother } from '@Tests/Contexts/Shared/domain/UuidMother'

export class DeleteUserCommandMother {
  static create (params?: Partial<DeleteUserCommand>): DeleteUserCommand {
    return new DeleteUserCommand(params?.id ?? UuidMother.random())
  }

  static random (): DeleteUserCommand {
    return this.create()
  }
}
