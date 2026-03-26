import { ChatRepository } from "@Core/Chat/domain/ChatRepository";
import { Chat } from "@Core/Chat/domain/Chat";
import { ChatNotFound } from "@Core/Chat/domain/Errors/ChatNotFound";
import { Id } from "@Core/Chat/domain/ValueObjects/Id";

export class Finder {
    constructor(private readonly repository: ChatRepository) { }

    async run(id: Id): Promise<Chat> {
        const chat = await this.repository.find(id)

        if (!chat) throw new ChatNotFound(id.valueOf())

        return chat
    }
}