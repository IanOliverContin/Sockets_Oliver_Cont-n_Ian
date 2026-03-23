import { UserResponse } from "@Core/User/application/UserResponse"
import { Controller } from "../../@types/Controller"
import { QueryBus } from "@Shared/domain/QueryBus/QueryBus"
import { FindUserByIdQuery } from "@Core/User/application/FindUserById/FindUserByIdQuery"
import { UserNotFound } from "@Core/User/domain/Errors/UserNotFound"
import { CannotDecode } from "@Shared/domain/TokenDecoder/Errors/CannotDecode"
import { Request, Response } from "express"

export class UserGetByIdController implements Controller {
    constructor(private readonly queryBus: QueryBus) { }

    async run(req: Request, res: Response): Promise<Response> {
        try {
            const query = new FindUserByIdQuery(req.params.id)

            const user = (await this.queryBus.ask<UserResponse>(query)).response

            return res.status(200).json(user)
        } catch (e) {
            if (e instanceof CannotDecode) return res.status(401).send(e.getMessage())
            if (e instanceof UserNotFound) return res.status(404).json({ message: e.getMessage() })

            return res.status(500).send()
        }
    }
}