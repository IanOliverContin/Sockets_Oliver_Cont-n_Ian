import { AggregateRoot } from '@Shared/domain/AggregateRoot'
import { Nullable } from '@Shared/domain/Nullable'
import { DeletedAt } from './ValueObjects/DeletedAt'
import { Email } from './ValueObjects/Email'
import { CreatedAt } from './ValueObjects/CreatedAt'
import { Id } from './ValueObjects/Id'
import { Name } from './ValueObjects/Name'
import { UpdatedAt } from './ValueObjects/UpdatedAt'
import { Username } from './ValueObjects/Username'
import { Password } from './ValueObjects/Password'
import { AVAILABLE_ROLES, Role } from './ValueObjects/Role'
import { Points } from './ValueObjects/Points'
import { Wallet } from './ValueObjects/Wallet'

export class User extends AggregateRoot {
  constructor (
    readonly id: Id,
    readonly name: Name,
    readonly username: Username,
    readonly email: Email,
    readonly password: Password,
    readonly role: Role,
    readonly points: Points,
    readonly wallet: Wallet,
    readonly createdAt: CreatedAt,
    readonly updatedAt: UpdatedAt,
    readonly deletedAt: Nullable<DeletedAt>
  ) {
    super()
  }

  static create (
    id: Id,
    name: Name,
    username: Username,
    email: Email,
    password: Password
  ): User {
    return new User(
      id,
      name,
      username,
      email,
      password,
      new Role(AVAILABLE_ROLES.MEMBER),
      new Points(0),
      new Wallet(0),
      new CreatedAt(new Date()),
      new UpdatedAt(new Date()),
      null
    )
  }

  updateRole (role: Role): User {
    return new User(
      this.id,
      this.name,
      this.username,
      this.email,
      this.password,
      role,
      this.points,
      this.wallet,
      this.createdAt,
      this.updatedAt,
      this.deletedAt
    )
  }

  updatePassword (password: Password): User {
    return new User(
      this.id,
      this.name,
      this.username,
      this.email,
      password,
      this.role,
      this.points,
      this.wallet,
      this.createdAt,
      this.updatedAt,
      this.deletedAt
    )
  }

  updatePoints (points: Points): User {
    return new User(
      this.id,
      this.name,
      this.username,
      this.email,
      this.password,
      this.role,
      points,
      this.wallet,
      this.createdAt,
      this.updatedAt,
      this.deletedAt
    )
  }

  updateWallet (wallet: Wallet): User {
    return new User(
      this.id,
      this.name,
      this.username,
      this.email,
      this.password,
      this.role,
      this.points,
      wallet,
      this.createdAt,
      this.updatedAt,
      this.deletedAt
    )
  }

  update (name: Name, username: Username): User {
    return new User(
      this.id,
      name,
      username,
      this.email,
      this.password,
      this.role,
      this.points,
      this.wallet,
      this.createdAt,
      new UpdatedAt(new Date()),
      this.deletedAt
    )
  }

  delete (): User {
    return new User(
      this.id,
      this.name,
      this.username,
      this.email,
      this.password,
      this.role,
      this.points,
      this.wallet,
      this.createdAt,
      this.updatedAt,
      new DeletedAt(new Date())
    )
  }
}
