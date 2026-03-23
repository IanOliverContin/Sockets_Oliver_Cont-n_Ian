import { UserRepository } from "@Core/User/domain/UserRepository";
import { Id } from "@Core/User/domain/ValueObjects/Id";
import { Name } from "@Core/User/domain/ValueObjects/Name";
import { UserNotFound } from "@Core/User/domain/Errors/UserNotFound";

export class Updater {
    constructor(private readonly repository: UserRepository) { }

    async run(id: Id, name: Name): Promise<void> {
        const user = await this.repository.find(id)

        if (!user) throw new UserNotFound(id.valueOf())

        const updatedUser = user.updateName(name)

        await this.repository.persist(updatedUser)
    }
}