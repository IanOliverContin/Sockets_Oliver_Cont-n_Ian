import { FindUserByIdQuery } from '@Core/User/application/FindById/FindUserByIdQuery'
import { UuidMother } from '@Tests/Contexts/Shared/domain/UuidMother'

export class FindUserByIdQueryMother {
  static create (id: string): FindUserByIdQuery {
    return new FindUserByIdQuery(id)
  }

  static random (): FindUserByIdQuery {
    return this.create(UuidMother.random())
  }
}
