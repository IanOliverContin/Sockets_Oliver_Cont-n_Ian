import { Request, Response } from 'express'
import { Controller } from '../../@types/Controller'
import { LoginQuery } from '@Core/User/application/Login/LoginQuery'
import { PhoneNotRegistered } from '@Core/User/domain/Errors/PhoneNotRegistered'
import { InvalidCredentialsError } from '@Core/User/domain/Errors/InvalidCredentialsError'
import { QueryBus } from '@Shared/domain/QueryBus/QueryBus'

export class UserLoginPostController implements Controller {
    constructor(private readonly queryBus: QueryBus) { }

    async run(req: Request, res: Response) {
        try {
            const query = new LoginQuery(req.body.phone, req.body.password)

            await this.queryBus.ask(query)

            return res.status(200).send()

        } catch (e) {

            if (e instanceof PhoneNotRegistered) return res.status(404).send(e.getMessage())
            if (e instanceof InvalidCredentialsError) return res.status(401).send(e.getMessage())
            return res.status(500).send()
        }
    }
}