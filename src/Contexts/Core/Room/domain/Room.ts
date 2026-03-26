import { AggregateRoot } from "@Shared/domain/AggregateRoot";
import { Id } from "./ValueObjects/Id";
import { ChatId } from "./ValueObjects/ChatId";
import { UserId } from "./ValueObjects/UserId";
import { CreatedAt } from "./ValueObjects/CreatedAt";
import { UpdatedAt } from "./ValueObjects/UpdatedAt";
import { DeletedAt } from "./ValueObjects/DeletedAt";
import { Nullable } from "@Shared/domain/Nullable";

export class Room extends AggregateRoot {
    constructor(
        readonly id: Id,
        readonly chatId: ChatId,
        readonly userId: UserId,
        readonly createdAt: CreatedAt,
        readonly updatedAt: UpdatedAt,
        readonly deletedAt: Nullable<DeletedAt>
    ) {
        super()
    }

    static create(
        id: Id,
        chatId: ChatId,
        userId: UserId,
    ): Room {
        return new Room(
            id,
            chatId,
            userId,
            new CreatedAt(new Date()),
            new UpdatedAt(new Date()),
            null
        )
    }

    delete(): Room {
        return new Room(
            this.id,
            this.chatId,
            this.userId,
            this.createdAt,
            new UpdatedAt(new Date()),
            new DeletedAt(new Date())
        )
    }
}