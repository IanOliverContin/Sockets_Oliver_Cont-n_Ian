import { UserRepositoryMock } from '@Tests/Contexts/Core/User/__mocks__/UserRepositoryMock'
import { Deleter } from '@Core/User/application/Delete/Deleter'
import { DeleteUserCommandHandler } from '@Core/User/application/Delete/DeleteUserCommandHandler'
import { DeleteUserCommandMother } from '@Tests/Contexts/Core/User/application/Delete/DeleteUserCommandMother'
import { UserMother } from '@Tests/Contexts/Core/User/domain/UserMother'
import { UserNotFound } from '@Core/User/domain/Errors/UserNotFound'

let repository: UserRepositoryMock
let deleter: Deleter
let handler: DeleteUserCommandHandler

describe('DeleteUserCommandHandler', () => {
  beforeEach(() => {
    repository = new UserRepositoryMock()
    deleter = new Deleter(repository)
    handler = new DeleteUserCommandHandler(deleter)
  })

  it('persists user with deletedAt set', async () => {
    const user = UserMother.random()
    repository.returnOnFind(user)

    const command = DeleteUserCommandMother.create({ id: user.id.valueOf() })
    await handler.handle(command)

    const persisted = repository.lastPersistedUser()
    expect(persisted.deletedAt).not.toBeNull()
  })

  it('throws UserNotFound when user does not exist', async () => {
    repository.returnOnFind(null)
    const command = DeleteUserCommandMother.random()

    await expect(handler.handle(command)).rejects.toThrow(UserNotFound)
  })
})
