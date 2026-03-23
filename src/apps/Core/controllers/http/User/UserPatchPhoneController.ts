import { Request, Response } from "express";
import { CommandBus } from "@Shared/domain/CommandBus/CommandBus";
import { UpdateUserPhoneCommand } from "@Core/User/application/UpdatePhone/UpdateUserPhoneCommand";
import { UserNotFound } from "@Core/User/domain/Errors/UserNotFound";
import { PhoneAlreadyRegistered } from "@Core/User/domain/Errors/PhoneAlreadyRegistered";
import { CannotDecode } from "@Shared/domain/TokenDecoder/Errors/CannotDecode";

export class UserPatchPhoneController {
    constructor(private readonly commandBus: CommandBus) { }

    async run(req: Request, res: Response) {
        try {
            if (!req.headers.authorization) return res.status(401).send()

            const userId = res.locals.userId

            const command = new UpdateUserPhoneCommand(userId, req.body.phone)

            await this.commandBus.dispatch(command)

            return res.status(200).send()
        } catch (e) {
            if (e instanceof CannotDecode) return res.status(401).send(e.getMessage())
            if (e instanceof UserNotFound) return res.status(404).send(e.getMessage())
            if (e instanceof PhoneAlreadyRegistered) return res.status(400).send(e.getMessage())

            return res.status(500).send()
        }
    }
}