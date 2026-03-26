import { ChatRepository } from "@Core/Chat/domain/ChatRepository";
import { Id } from "@Core/User/domain/ValueObjects/Id";
import { Name } from "@Core/User/domain/ValueObjects/Name";
import { Description } from "@Core/Chat/domain/ValueObjects/Description";
import { IsGroup } from "@Core/Chat/domain/ValueObjects/IsGroup";
import { AdminId } from "@Core/Chat/domain/ValueObjects/AdminId";
import { Chat } from "@Core/Chat/domain/Chat";
import { Nullable } from "@Shared/domain/Nullable";
import { CommandBus } from "@Shared/domain/CommandBus/CommandBus";
import { CreateRoomCommand } from "@Core/Room/application/Create/CreateRoomCommand";
import { Phone } from "@Core/Chat/domain/ValueObjects/Phone";
import { UserNotFound } from "@Core/Room/domain/Errors/UserNotFound";
import { QueryBus } from "@Shared/domain/QueryBus/QueryBus";
import { FindUsersByCriteriaQuery } from "@Core/User/application/FindByCriteria/FindUserByCriteriaQuery";
import { UserCollectionResponse } from "@Core/User/application/UserCollectionResponse";
import { v4 } from "uuid";

export class Creator {
    constructor(private readonly repository: ChatRepository,
        private readonly commandBus: CommandBus,
        private readonly queryBus: QueryBus
    ) { }

    async run(
        id: Id,
        name: Name,
        description: Nullable<Description>,
        isGroup: IsGroup,
        adminId: AdminId,
        phone: Phone
    ): Promise<void> {

        if (isGroup.valueOf() === false) {
            const chat = Chat.create(
                id,
                name,
                null,
                isGroup,
                null
            )

            const otherUserResponse = await this.queryBus.ask<UserCollectionResponse>(new FindUsersByCriteriaQuery(
                [
                    new Map([
                        ['field', 'phone'],
                        ['operator', '='],
                        ['value', phone.valueOf() as string]
                    ])
                ]
            ))

            if (otherUserResponse.response.length === 0) throw new UserNotFound(phone.valueOf())

            const UsersId = [otherUserResponse.response[0].id, adminId.valueOf()]

            for (let i = 0; i < 2; i++) {
                this.commandBus.dispatch(new CreateRoomCommand(
                    v4(),
                    chat.id.valueOf(),
                    UsersId[i]
                ))
            }

            await this.repository.persist(chat)
            return
        }


        const chat = Chat.create(
            id,
            name,
            description,
            isGroup,
            adminId
        )

        this.commandBus.dispatch(new CreateRoomCommand(
            v4(),
            chat.id.valueOf(),
            adminId.valueOf()
        ))

        await this.repository.persist(chat)
    }
}