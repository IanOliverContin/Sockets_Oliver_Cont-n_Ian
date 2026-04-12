import { ChatRepository } from "@Core/Chat/domain/ChatRepository";
import { Id } from "@Core/Chat/domain/ValueObjects/Id";
import { Description } from "@Core/Chat/domain/ValueObjects/Description";
import { ChatNotFound } from "@Core/Chat/domain/Errors/ChatNotFound";
import { ChatIsNotAGroup } from "@Core/Chat/domain/Errors/ChatIsNotAGroup";

export class Updater {
    constructor(private readonly repository: ChatRepository) { }

    async run(id: Id, description: Description): Promise<void> {
        const chat = await this.repository.find(id)

        if (!chat) throw new ChatNotFound(id.valueOf())

        if (!chat.isGroup.valueOf()) throw new ChatIsNotAGroup(id.valueOf())

        const updatedChat = chat.updateDescription(description)

        await this.repository.persist(updatedChat)
    }
}
