import { UserRepository } from "@Core/User/domain/UserRepository";
import { Criteria } from "@Shared/domain/Criteria/Criteria";
import { User } from "@Core/User/domain/User";

export class Finder {
    constructor(private readonly repository: UserRepository) { }

    async run(criteria: Criteria): Promise<User[]> {
        return await this.repository.search(criteria)
    }
}