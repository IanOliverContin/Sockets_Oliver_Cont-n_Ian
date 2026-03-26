import { RoomRepository } from "@Core/Room/domain/RoomRepository";
import { ChatId } from "@Core/Room/domain/ValueObjects/ChatId";
import { Id } from "@Core/Room/domain/ValueObjects/Id";
import { UserId } from "@Core/Room/domain/ValueObjects/UserId";
import { QueryBus } from "@Shared/domain/QueryBus/QueryBus";
import { FindChatByIdQuery } from "@Core/Chat/application/FindById/FindChatByIdQuery";
import { ChatNotFound } from "@Core/Room/domain/Errors/ChatNotFound";
import { UserNotFound } from "@Core/Room/domain/Errors/UserNotFound";
import { FindUserByIdQuery } from "@Core/User/application/FindUserById/FindUserByIdQuery";
import { Room } from "@Core/Room/domain/Room";

export class Creator {
    constructor(
        private readonly repository: RoomRepository,
        private readonly queryBus: QueryBus
    ) { }

    async run(
        id: Id,
        chatId: ChatId,
        userId: UserId
    ): Promise<void> {
        await this.ensureChatExists(chatId)
        await this.ensureUserExists(userId)

        const room = Room.create(id, chatId, userId)
        await this.repository.persist(room)
    }

    async ensureChatExists(chatId: ChatId): Promise<void> {
        const chat = (await this.queryBus.ask(new FindChatByIdQuery(chatId.valueOf()))).response;
        if (!chat) throw new ChatNotFound('Chat not found')
    }

    async ensureUserExists(userId: UserId): Promise<void> {
        const user = (await this.queryBus.ask(new FindUserByIdQuery(userId.valueOf()))).response;
        if (!user) throw new UserNotFound('User not found')
    }
}