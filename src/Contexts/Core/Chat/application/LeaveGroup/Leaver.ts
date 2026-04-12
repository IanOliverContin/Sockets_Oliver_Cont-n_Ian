import { ChatRepository } from "@Core/Chat/domain/ChatRepository";
import { QueryBus } from "@Shared/domain/QueryBus/QueryBus";
import { CommandBus } from "@Shared/domain/CommandBus/CommandBus";
import { Id } from "@Core/Chat/domain/ValueObjects/Id";
import { Nullable } from "@Shared/domain/Nullable";
import { AdminId } from "@Core/Chat/domain/ValueObjects/AdminId";
import { FindUserByIdQuery } from "@Core/User/application/FindUserById/FindUserByIdQuery";
import { ChatNotFound } from "@Core/Chat/domain/Errors/ChatNotFound";
import { ChatIsNotAGroup } from "@Core/Chat/domain/Errors/ChatIsNotAGroup";
import { UserNotFound } from "@Core/Chat/domain/Errors/UserNotFound";
import { FindRoomByCriteriaQuery } from "@Core/Room/application/FindByCriteria/FindRoomByCriteriaQuery";
import { DeleteRoomCommand } from "@Core/Room/application/Delete/DeleteRoomCommand";
import { RoomCollectionResponse } from "@Core/Room/application/RoomCollectionResponse";
import { UserResponse } from "@Core/User/application/UserResponse";

export class Leaver {
    constructor(
        private readonly repository: ChatRepository,
        private readonly queryBus: QueryBus,
        private readonly commandBus: CommandBus
    ) { }

    async run(chatId: Id, userId: string, NewAdminId: Nullable<AdminId>): Promise<void> {
        const chat = await this.repository.find(chatId)

        if (!chat) throw new ChatNotFound(chatId.valueOf())
        if (chat.isGroup.valueOf() === false) throw new ChatIsNotAGroup(chat.id.valueOf())

        const user = await this.queryBus.ask<UserResponse>(new FindUserByIdQuery(userId))
        if (!user) throw new UserNotFound()

        if (chat.adminId?.valueOf() === userId) {
            if (NewAdminId) {
                const updatedChat = chat.updateAdminId(NewAdminId)
                await this.repository.persist(updatedChat)
            }
        }

        const roomCollection = await this.queryBus.ask<RoomCollectionResponse>(new FindRoomByCriteriaQuery(
            [
                new Map([
                    ['field', 'userId'],
                    ['operator', '='],
                    ['value', userId]
                ]),
                new Map([
                    ['field', 'chatId'],
                    ['operator', '='],
                    ['value', chatId.valueOf()]
                ])
            ]
        ))

        if (roomCollection.response.length === 0) throw new UserNotFound()

        await this.commandBus.dispatch(new DeleteRoomCommand(
            roomCollection.response[0].id
        ))
    }
}