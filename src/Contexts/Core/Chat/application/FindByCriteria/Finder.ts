import { Criteria } from "@Shared/domain/Criteria/Criteria";
import { Chat } from "@Core/Chat/domain/Chat";
import { ChatRepository } from "@Core/Chat/domain/ChatRepository";

export class Finder {
    constructor(private readonly repository: ChatRepository) { }

    async run(criteria: Criteria): Promise<Chat[]> {
        return await this.repository.search(criteria)
    }
}