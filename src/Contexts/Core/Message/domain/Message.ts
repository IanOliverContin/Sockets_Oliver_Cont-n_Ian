import { Id } from "./ValueObjects/Id";
import { ChatId } from "./ValueObjects/ChatId";
import { RoomId } from "./ValueObjects/RoomId";
import { UserId } from "./ValueObjects/UserId";
import { Content } from "./ValueObjects/Content";



export class Message {
    constructor(
        private readonly id: Id,
        private readonly chatId: ChatId,
        private readonly userId: UserId,
        private readonly roomId: RoomId,
        private readonly content: Content,
        private readonly status: Status,
        private readonly createdAt: CreatedAt,
        private readonly updatedAt: UpdatedAt,
        private readonly deletedAt: DeletedAt
    ) { }
}