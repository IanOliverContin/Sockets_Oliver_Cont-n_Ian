import { UserRepositoryMock } from '@Tests/Contexts/Core/User/__mocks__/UserRepositoryMock'
import { FinderById } from '@Core/User/application/FindById/FinderById'
import { FindUserByIdQueryHandler } from '@Core/User/application/FindById/FindUserByIdQueryHandler'
import { FindUserByIdQueryMother } from '@Tests/Contexts/Core/User/application/FindById/FindUserByIdQueryMother'
import { UserMother } from '@Tests/Contexts/Core/User/domain/UserMother'
import { UserResponseMother } from '@Tests/Contexts/Core/User/application/UserResponseMother'
import { UserNotFound } from '@Core/User/domain/Errors/UserNotFound'

let repository: UserRepositoryMock
let finder: FinderById
let handler: FindUserByIdQueryHandler

describe('FindUserByIdQueryHandler', () => {
  beforeEach(() => {
    repository = new UserRepositoryMock()
    finder = new FinderById(repository)
    handler = new FindUserByIdQueryHandler(finder)
  })

  it('returns user response when user exists', async () => {
    const user = UserMother.random()
    repository.returnOnFind(user)

    const query = FindUserByIdQueryMother.create(user.id.valueOf())
    const response = await handler.handle(query)

    repository.assertFindHasBeenCalledWith(user.id)
    expect(response).toEqual(UserResponseMother.create(user))
  })

  it('throws UserNotFound when user does not exist', async () => {
    repository.returnOnFind(null)
    const query = FindUserByIdQueryMother.random()

    await expect(handler.handle(query)).rejects.toThrow(UserNotFound)
  })
})
