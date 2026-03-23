import { UserRepository } from '@Core/User/domain/UserRepository'
import { User } from '@Core/User/domain/User'
import { Id } from '@Core/User/domain/ValueObjects/Id'
import { Criteria } from '@Shared/domain/Criteria/Criteria'
import { Nullable } from '@Shared/domain/Nullable'
import { mockFn } from '../../../../mockUtils'

export class UserRepositoryMock implements UserRepository {
  private mockPersist = mockFn()
  private mockFind = mockFn()
  private mockSearch = mockFn()

  private user: Nullable<User> = null
  private users: User[] = []

  async persist (user: User): Promise<void> {
    this.mockPersist(user)
  }

  async find (id: Id): Promise<Nullable<User>> {
    this.mockFind(id)
    return this.user
  }

  async search (criteria: Criteria): Promise<User[]> {
    this.mockSearch(criteria)
    return this.users
  }

  returnOnFind (user: Nullable<User>): void {
    this.user = user
  }

  returnOnSearch (users: User[]): void {
    this.users = users
  }

  assertLastPersistedUserIs (expected: User): void {
    expect(this.mockPersist).toHaveBeenLastCalledWith(expected)
  }

  lastPersistedUser (): User {
    const lastUser = this.mockPersist.mock.calls[this.mockPersist.mock.calls.length - 1]?.[0]
    expect(lastUser).toBeDefined()
    return lastUser
  }

  assertFindHasBeenCalledWith (expected: Id): void {
    expect(this.mockFind).toHaveBeenCalledWith(expected)
  }

  assertSearchHasBeenCalledWith (expected: Criteria): void {
    expect(this.mockSearch).toHaveBeenCalledWith(expected)
  }
}
