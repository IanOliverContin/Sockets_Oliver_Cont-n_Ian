import { UserRepository } from "../../domain/UserRepository";
import { User } from "../../domain/User";
import { Criteria } from "@Shared/domain/Criteria/Criteria";
import { Filters } from "@Shared/domain/Criteria/Filters";
import { Filter } from "@Shared/domain/Criteria/Filter";
import { PhoneNotRegistered } from "../../domain/Errors/PhoneNotRegistered";
import { InvalidCredentialsError } from "../../domain/Errors/InvalidCredentialsError";
import { Phone } from "@Core/User/domain/ValueObjects/Phone";
import { Password } from "@Core/User/domain/ValueObjects/Password";

export class Login {
    constructor(
        private readonly repository: UserRepository
    ) { }

    async run(
        phone: Phone,
        password: Password
    ): Promise<User> {
        const user = await this.findByPhone(phone.valueOf())

        if (!user) throw new PhoneNotRegistered(phone.valueOf())

        if (!user.password.compare(password.valueOf())) throw new InvalidCredentialsError()

        return user
    }

    private async findByPhone(phone: string): Promise<User | undefined> {

        const existingUserByPhone = (await this.repository.search(
            new Criteria(
                new Filters(
                    [
                        Filter.simple('phone', '=', phone.valueOf())
                    ]
                )
            )
        )).pop()

        return existingUserByPhone
    }
}