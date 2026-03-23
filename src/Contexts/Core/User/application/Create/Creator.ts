import { UserAlreadyExistsById } from '@Core/User/domain/Errors/UserAlreadyExistsById'
import { UserAlreadyExistsByEmail } from '@Core/User/domain/Errors/UserAlreadyExistsByEmail'
import { User } from '@Core/User/domain/User'
import { UserRepository } from '@Core/User/domain/UserRepository'
import { Email } from '@Core/User/domain/ValueObjects/Email'
import { Id } from '@Core/User/domain/ValueObjects/Id'
import { Name } from '@Core/User/domain/ValueObjects/Name'
import { Password } from '@Core/User/domain/ValueObjects/Password'
import { Username } from '@Core/User/domain/ValueObjects/Username'
import { Criteria } from '@Shared/domain/Criteria/Criteria'
import { Filter } from '@Shared/domain/Criteria/Filter'
import { Filters } from '@Shared/domain/Criteria/Filters'

export class Creator {
  constructor (private readonly repository: UserRepository) {}

  async run (id: Id, name: Name, email: Email, password: Password) {
    await this.checkIfUserExists(id, email)

    const idStr = id.valueOf()
    const prefixEnd = idStr.indexOf('-') > 0 ? idStr.indexOf('-') - 1 : 8
    const username = Username.createFromNonSlug(
      `${name.valueOf()}-${idStr.substring(0, Math.max(0, prefixEnd)) || idStr.slice(0, 8)}`
    )

    const user = User.create(id, name, username, email, password)

    await this.repository.persist(user)
  }

  private async checkIfUserExists (id: Id, email: Email) {
    const existingUserById = await this.repository.find(id)

    if (existingUserById) throw new UserAlreadyExistsById(existingUserById.id)

    const existingUserByEmail = (await this.repository.search(
      new Criteria(
        new Filters(
          [
            Filter.simple('email', '=', email.valueOf())
          ]
        )
      )
    )).pop()

    if (existingUserByEmail) throw new UserAlreadyExistsByEmail(existingUserByEmail.email)
  }
}
