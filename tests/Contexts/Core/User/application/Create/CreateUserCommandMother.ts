import { CreateUserCommand } from '@Core/User/application/Create/CreateUserCommand'
import { UuidMother } from '@Tests/Contexts/Shared/domain/UuidMother'
import { MotherCreator } from '@Tests/Contexts/Shared/domain/MotherCreator'

export class CreateUserCommandMother {
  static create (params?: Partial<CreateUserCommand>): CreateUserCommand {
    return new CreateUserCommand(
      params?.id ?? UuidMother.random(),
      params?.name ?? MotherCreator.random().person.fullName(),
      params?.email ?? MotherCreator.random().internet.email(),
      params?.password ?? MotherCreator.random().string.alphanumeric(10)
    )
  }
}
