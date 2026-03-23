import { User } from '@Core/User/domain/User'
import { Id } from '@Core/User/domain/ValueObjects/Id'
import { Name } from '@Core/User/domain/ValueObjects/Name'
import { Username } from '@Core/User/domain/ValueObjects/Username'
import { Email } from '@Core/User/domain/ValueObjects/Email'
import { Password } from '@Core/User/domain/ValueObjects/Password'
import { Role, AVAILABLE_ROLES } from '@Core/User/domain/ValueObjects/Role'
import { Points } from '@Core/User/domain/ValueObjects/Points'
import { Wallet } from '@Core/User/domain/ValueObjects/Wallet'
import { CreatedAt } from '@Core/User/domain/ValueObjects/CreatedAt'
import { UpdatedAt } from '@Core/User/domain/ValueObjects/UpdatedAt'
import { DeletedAt } from '@Core/User/domain/ValueObjects/DeletedAt'
import { UuidMother } from '@Tests/Contexts/Shared/domain/UuidMother'
import { MotherCreator } from '@Tests/Contexts/Shared/domain/MotherCreator'
import { DateMother } from '@Tests/Contexts/Shared/domain/DateMother'
import { Nullable } from '@Shared/domain/Nullable'

export class UserMother {
  static create (params: Partial<{
    id: Id
    name: Name
    username: Username
    email: Email
    password: Password
    role: Role
    points: Points
    wallet: Wallet
    createdAt: CreatedAt
    updatedAt: UpdatedAt
    deletedAt: Nullable<DeletedAt>
  }>): User {
    const name = params.name ?? new Name(MotherCreator.random().person.fullName())
    const id = params.id ?? new Id(UuidMother.random())
    const idStr = id.valueOf()
    const prefixEnd = idStr.indexOf('-') > 0 ? idStr.indexOf('-') - 1 : 8
    const username = params.username ?? Username.createFromNonSlug(
      `${name.valueOf()}-${idStr.substring(0, Math.max(0, prefixEnd)) || idStr.slice(0, 8)}`
    )
    const email = params.email ?? new Email(MotherCreator.random().internet.email())
    const password = params.password ?? Password.create(MotherCreator.random().string.alphanumeric(10))
    return new User(
      id,
      name,
      username,
      email,
      password,
      params.role ?? new Role(AVAILABLE_ROLES.MEMBER),
      params.points ?? new Points(0),
      params.wallet ?? new Wallet(0),
      params.createdAt ?? new CreatedAt(DateMother.now()),
      params.updatedAt ?? new UpdatedAt(DateMother.now()),
      params.deletedAt ?? null
    )
  }

  static random (): User {
    return this.create({})
  }

  static deleted (): User {
    return this.create({
      deletedAt: new DeletedAt(DateMother.now())
    })
  }
}
