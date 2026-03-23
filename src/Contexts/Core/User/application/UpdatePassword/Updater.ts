import { UserRepository } from "@Core/User/domain/UserRepository";
import { Id } from "@Core/User/domain/ValueObjects/Id";
import { Password } from "@Core/User/domain/ValueObjects/Password";
import { UserNotFound } from "@Core/User/domain/Errors/UserNotFound";
import { PasswordNotMatchException } from "@Core/User/domain/Errors/PasswordNotMatchException";

export class Updater {
    constructor(private readonly repository: UserRepository) { }

    async run(id: Id, oldPassowrd: string, newpassword: Password): Promise<void> {
        const user = await this.repository.find(id)

        if (!user) throw new UserNotFound(id.valueOf())

        if (user.password.compare(oldPassowrd)) throw new PasswordNotMatchException(oldPassowrd)

        const updatedUser = user.updatePassword(newpassword)

        await this.repository.persist(updatedUser)
    }

}