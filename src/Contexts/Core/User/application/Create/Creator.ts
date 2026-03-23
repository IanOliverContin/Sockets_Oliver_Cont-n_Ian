import { User } from '@Core/User/domain/User'
import { UserRepository } from '@Core/User/domain/UserRepository'
import { Id } from '@Core/User/domain/ValueObjects/Id'
import { Name } from '@Core/User/domain/ValueObjects/Name'
import { Password } from '@Core/User/domain/ValueObjects/Password'
import { Criteria } from '@Shared/domain/Criteria/Criteria'
import { Filter } from '@Shared/domain/Criteria/Filter'
import { Filters } from '@Shared/domain/Criteria/Filters'
import { UserAlreadyExistsById } from '@Core/User/domain/Errors/UserAlreadyExistsById'
import { Phone } from '@Core/User/domain/ValueObjects/Phone'
import { PhoneAlreadyRegistered } from '@Core/User/domain/Errors/PhoneAlreadyRegistered'

export class Creator {
    constructor(private readonly repository: UserRepository) { }

    async run(
        id: Id,
        name: Name,
        phone: Phone,
        password: Password,
    ): Promise<void> {
        await this.checkIfUserExists(id, phone)

        const user = User.create(
            id,
            name,
            phone,
            password
        )

        await this.repository.persist(user)
    }

    private async checkIfUserExists(id: Id, phone: Phone): Promise<void> {
        const existingUserById = await this.repository.find(id)

        if (existingUserById) throw new UserAlreadyExistsById(existingUserById.id.valueOf())
        const existingUserByPhone = (await this.repository.search(
            new Criteria(
                new Filters(
                    [
                        Filter.simple('phone', '=', phone.valueOf())
                    ]
                )
            )
        )).pop()

        if (existingUserByPhone) throw new PhoneAlreadyRegistered(existingUserByPhone.phone.valueOf())
    }
}
