import { UserRepository } from "@Core/User/domain/UserRepository";
import { Id } from "@Core/User/domain/ValueObjects/Id";
import { UserNotFound } from "@Core/User/domain/Errors/UserNotFound";

export class Deleter {
    constructor(private readonly repository: UserRepository) { }

    async run(id: Id): Promise<void> {
        const user = await this.repository.find(id)

        if (!user) throw new UserNotFound(id.valueOf())

        user.delete()

        await this.repository.persist(user)
    }
}