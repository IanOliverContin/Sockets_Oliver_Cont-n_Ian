import { ChatRepository } from "@Core/Chat/domain/ChatRepository";
import { Id } from "@Core/User/domain/ValueObjects/Id";
import { QueryBus } from "@Shared/domain/QueryBus/QueryBus";
import { CommandBus } from "@Shared/domain/CommandBus/CommandBus";
import { ChatNotFound } from "@Core/Chat/domain/Errors/ChatNotFound";
import { FindRoomByCriteriaQuery } from "@Core/Room/application/FindByCriteria/FindRoomByCriteriaQuery";
import { RoomCollectionResponse } from "@Core/Room/application/RoomCollectionResponse";
import { DeleteRoomCommand } from "@Core/Room/application/Delete/DeleteRoomCommand";
import { AdminId } from "@Core/Chat/domain/ValueObjects/AdminId";
import { UserNotAdmin } from "@Core/Chat/domain/Errors/UserNotAdmin";

export class Deleter {
    constructor(
        private readonly repository: ChatRepository,
        private readonly queryBus: QueryBus,
        private readonly commandBus: CommandBus
    ) { }

    async run(id: Id, adminId: AdminId): Promise<void> {

        const chat = await this.repository.find(id)

        if (!chat) throw new ChatNotFound(id.valueOf())

        if (chat.isGroup.valueOf()) {
            if (chat.adminId?.valueOf() !== adminId.valueOf()) throw new UserNotAdmin(adminId.valueOf())

            await this.deleteRooms(id)
        } else {
            await this.deleteRooms(id)
        }

        chat.delete()

        await this.repository.persist(chat)

    }

    async deleteRooms(chatId: Id): Promise<void> {
        const rooms = await this.queryBus.ask<RoomCollectionResponse>(new FindRoomByCriteriaQuery([
            new Map([
                ['field', 'chatId'],
                ['operator', '='],
                ['value', chatId.valueOf() as string]
            ])
        ]))

        rooms.response.map(room => {
            this.commandBus.dispatch(new DeleteRoomCommand(room.id))
        })

    }
}