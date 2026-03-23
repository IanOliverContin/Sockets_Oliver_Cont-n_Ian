import { UserRepository } from "@Core/User/domain/UserRepository";
import { Id } from "@Core/User/domain/ValueObjects/Id";
import { Phone } from "@Core/User/domain/ValueObjects/Phone";
import { UserNotFound } from "@Core/User/domain/Errors/UserNotFound";
import { Criteria } from "@Shared/domain/Criteria/Criteria";
import { Filter } from "@Shared/domain/Criteria/Filter";
import { Filters } from "@Shared/domain/Criteria/Filters";
import { PhoneAlreadyRegistered } from "@Core/User/domain/Errors/PhoneAlreadyRegistered";

export class Updater {
    constructor(private readonly repository: UserRepository) { }

    async run(id: Id, phone: Phone): Promise<void> {
        const user = await this.repository.find(id)

        if (!user) throw new UserNotFound(id.valueOf())

        await this.checkIfPhoneAlreadyRegistered(phone)

        const updatedUser = user.updatePhone(phone)

        await this.repository.persist(updatedUser)
    }

    private async checkIfPhoneAlreadyRegistered(phone: Phone): Promise<void> {
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