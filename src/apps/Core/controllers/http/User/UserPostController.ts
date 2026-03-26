import { Request, Response, } from "express";
import { CommandBus } from "@Shared/domain/CommandBus/CommandBus";
import { CreateUserCommand } from "@Core/User/application/Create/CreateUserCommand";
import { v4 } from "uuid";
import { UserAlreadyExistsById } from "@Core/User/domain/Errors/UserAlreadyExistsById";
import { PhoneAlreadyRegistered } from "@Core/User/domain/Errors/PhoneAlreadyRegistered";
import { InvalidPasswordFormat } from "@Core/User/domain/Errors/InvalidPasswordFormat";

export class UserPostController {
    constructor(private readonly commandBus: CommandBus) { }

    async run(req: Request, res: Response) {
        try {

            if (!req.headers.authorization) return res.status(401).send()

            const id = v4()

            const command = new CreateUserCommand(
                id,
                req.body.name,
                req.body.phone,
                req.body.password
            )

            await this.commandBus.dispatch(command)
            res.status(201).send()
        } catch (e) {
            if (e instanceof UserAlreadyExistsById) return res.status(400).send()
            if (e instanceof PhoneAlreadyRegistered) return res.status(400).send()
            if (e instanceof InvalidPasswordFormat) return res.status(400).send()
            return res.status(500).send()
        }
    }
}