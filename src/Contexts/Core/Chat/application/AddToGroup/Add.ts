import { ChatRepository } from "@Core/Chat/domain/ChatRepository";
import { ChatNotFound } from "@Core/Chat/domain/Errors/ChatNotFound";
import { Id } from "@Core/Chat/domain/ValueObjects/Id";
import { Phone } from "@Core/Chat/domain/ValueObjects/Phone";
import { UserCollectionResponse } from "@Core/User/application/UserCollectionResponse";
import { FindUsersByCriteriaQuery } from "@Core/User/application/FindByCriteria/FindUserByCriteriaQuery";
import { CommandBus } from "@Shared/domain/CommandBus/CommandBus";
import { QueryBus } from "@Shared/domain/QueryBus/QueryBus";
import { UserNotFound } from "@Core/Chat/domain/Errors/UserNotFound";
import { CreateRoomCommand } from "@Core/Room/application/Create/CreateRoomCommand";
import { v4 } from "uuid";
import { AdminId } from "@Core/Chat/domain/ValueObjects/AdminId";
import { UserNotAdmin } from "@Core/Chat/domain/Errors/UserNotAdmin";
import { ChatIsNotAGroup } from "@Core/Chat/domain/Errors/ChatIsNotAGroup";

export class Add {
    constructor(private readonly repository: ChatRepository,
        private readonly commandBus: CommandBus,
        private readonly queryBus: QueryBus
    ) { }

    async run(
        id: Id,
        adminId: AdminId,
        phones: Phone[]
    ): Promise<void> {

        const chat = await this.repository.find(id)

        if (!chat || chat === undefined) throw new ChatNotFound(id.valueOf())

        if (!chat.isGroup.valueOf()) {
            throw new ChatIsNotAGroup(id.valueOf())
        }

        if (chat.adminId?.valueOf() !== adminId.valueOf()) throw new UserNotAdmin(adminId.valueOf())

        await this.checkUserPhone(id, phones)
    }

    async checkUserPhone(id: Id, phones: Phone[]): Promise<void> {
        for (const phone of phones) {
            const user = await this.queryBus.ask<UserCollectionResponse>(new FindUsersByCriteriaQuery([
                new Map([
                    ['field', 'phone'],
                    ['operator', '='],
                    ['value', phone.valueOf() as string]
                ])
            ]))

            if (user.response.length === 0) throw new UserNotFound(phone.valueOf())

            this.commandBus.dispatch(new CreateRoomCommand(
                v4(),
                id.valueOf(),
                user.response[0].id.valueOf()
            ))
        }


    }
}