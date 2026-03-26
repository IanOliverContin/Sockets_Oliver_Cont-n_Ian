import { Request, Response, } from "express";
import { CommandBus } from "@Shared/domain/CommandBus/CommandBus";
import { CreateRoomCommand } from "@Core/Room/application/Create/CreateRoomCommand";
import { v4 } from "uuid";
import { UserNotFound } from "@Core/Room/domain/Errors/UserNotFound";
import { ChatNotFound } from "@Core/Room/domain/Errors/ChatNotFound";
import { CannotDecode } from "@Shared/domain/TokenDecoder/Errors/CannotDecode";


export class RoomPostController {
    constructor(private readonly commandBus: CommandBus) { }

    async run(req: Request, res: Response) {
        try {

            if (!req.headers.authorization) return res.status(401).send()

            const id = v4()

            const command = new CreateRoomCommand(
                id,
                req.body.chatId,
                req.body.userId
            )

            await this.commandBus.dispatch(command)
            res.status(201).send()
        } catch (e) {
            if (e instanceof CannotDecode) return res.status(401).send()
            if (e instanceof UserNotFound) return res.status(400).send()
            if (e instanceof ChatNotFound) return res.status(400).send()
            return res.status(500).send()
        }
    }
}