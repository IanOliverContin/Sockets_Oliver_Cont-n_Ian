import { UserRepositoryMock } from '@Tests/Contexts/Core/User/__mocks__/UserRepositoryMock'
import { Creator } from '@Core/User/application/Create/Creator'
import { CreateUserCommandHandler } from '@Core/User/application/Create/CreateUserCommandHandler'
import { CreateUserCommandMother } from '@Tests/Contexts/Core/User/application/Create/CreateUserCommandMother'
import { UuidMother } from '@Tests/Contexts/Shared/domain/UuidMother'
import { UserMother } from '@Tests/Contexts/Core/User/domain/UserMother'
import { UserAlreadyExistsById } from '@Core/User/domain/Errors/UserAlreadyExistsById'
import { UserAlreadyExistsByEmail } from '@Core/User/domain/Errors/UserAlreadyExistsByEmail'

let repository: UserRepositoryMock
let creator: Creator
let handler: CreateUserCommandHandler

describe('CreateUserCommandHandler', () => {
  beforeEach(() => {
    repository = new UserRepositoryMock()
    creator = new Creator(repository)
    handler = new CreateUserCommandHandler(creator)
  })

  it('persists a new user with id, name, email and password', async () => {
    repository.returnOnFind(null)
    repository.returnOnSearch([])

    const command = CreateUserCommandMother.create()
    await handler.handle(command)

    const persisted = repository.lastPersistedUser()
    expect(persisted.id.valueOf()).toBe(command.id)
    expect(persisted.name.valueOf()).toBe(command.name)
    expect(persisted.email.valueOf()).toBe(command.email)
    expect(persisted.password.valueOf()).toBe(command.password)
  })

  it('builds username from name and id prefix', async () => {
    repository.returnOnFind(null)
    repository.returnOnSearch([])

    const id = UuidMother.random()
    const command = CreateUserCommandMother.create({
      id,
      name: 'Jane Doe'
    })
    await handler.handle(command)

    const persisted = repository.lastPersistedUser()
    expect(persisted.username.valueOf()).toMatch(/jane-doe-/)
  })

  it('throws UserAlreadyExistsById when id already exists', async () => {
    const existing = UserMother.random()
    repository.returnOnFind(existing)
    repository.returnOnSearch([])

    const command = CreateUserCommandMother.create({ id: existing.id.valueOf() })

    await expect(handler.handle(command)).rejects.toThrow(UserAlreadyExistsById)
  })

  it('throws UserAlreadyExistsByEmail when email already exists', async () => {
    repository.returnOnFind(null)
    const existing = UserMother.random()
    repository.returnOnSearch([existing])

    const command = CreateUserCommandMother.create({ email: existing.email.valueOf() })

    await expect(handler.handle(command)).rejects.toThrow(UserAlreadyExistsByEmail)
  })
})
