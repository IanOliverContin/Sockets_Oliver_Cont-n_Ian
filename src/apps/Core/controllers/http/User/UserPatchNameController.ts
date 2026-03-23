import { Request, Response } from "express";
import { CommandBus } from "@Shared/domain/CommandBus/CommandBus";
import { UpdateUserNameCommand } from "@Core/User/application/UpdateName/UpdateUserNameCommand";
import { UserNotFound } from "@Core/User/domain/Errors/UserNotFound";
import { CannotDecode } from "@Shared/domain/TokenDecoder/Errors/CannotDecode";

export class UserPatchNameController {
    constructor(private readonly commandBus: CommandBus) { }

    async run(req: Request, res: Response) {
        try {
            if (!req.headers.authorization) return res.status(401).send()

            const userId = res.locals.userId

            const command = new UpdateUserNameCommand(userId, req.body.name)

            await this.commandBus.dispatch(command)

            return res.status(200).send()
        } catch (e) {
            if (e instanceof CannotDecode) return res.status(401).send(e.getMessage())
            if (e instanceof UserNotFound) return res.status(404).send(e.getMessage())

            return res.status(500).send()
        }
    }
}