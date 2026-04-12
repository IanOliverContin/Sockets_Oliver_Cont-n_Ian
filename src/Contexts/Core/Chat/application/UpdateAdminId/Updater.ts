import { ChatRepository } from "@Core/Chat/domain/ChatRepository";
import { Id } from "@Core/Chat/domain/ValueObjects/Id";
import { AdminId } from "@Core/Chat/domain/ValueObjects/AdminId";
import { ChatNotFound } from "@Core/Chat/domain/Errors/ChatNotFound";

export class Updater {
    constructor(private readonly repository: ChatRepository) { }

    async run(id: Id, adminId: AdminId): Promise<void> {
        const chat = await this.repository.find(id)

        if (!chat) throw new ChatNotFound(id.valueOf())

        const updatedChat = chat.updateAdminId(adminId)

        await this.repository.persist(updatedChat)
    }
}
