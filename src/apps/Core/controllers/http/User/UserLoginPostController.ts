import { Request, Response } from 'express'
import { Controller } from '../../@types/Controller'
import { LoginQuery } from '@Core/User/application/Login/LoginQuery'
import { PhoneNotRegistered } from '@Core/User/domain/Errors/PhoneNotRegistered'
import { InvalidCredentialsError } from '@Core/User/domain/Errors/InvalidCredentialsError'
import { QueryBus } from '@Shared/domain/QueryBus/QueryBus'
import { TokenGenerator } from '@Shared/domain/TokenGenerator/TokenGenerator'
import { UserResponse } from '@Core/User/application/UserResponse'

export class UserLoginPostController implements Controller {
    constructor(
        private readonly queryBus: QueryBus,
        private readonly tokenGenerator: TokenGenerator
    ) { }

    async run(req: Request, res: Response) {
        try {
            const query = new LoginQuery(req.body.phone, req.body.password)

            const userResponse = await this.queryBus.ask<UserResponse>(query)
            const user = userResponse.response

            const token = await this.tokenGenerator.generate({
                id: user.id.valueOf(),
                phone: user.phone
            })

            res.cookie("accessToken", token, {
                path: "/",
                httpOnly: false,
                secure: false,
                sameSite: "lax",
                maxAge: 3600000000
            })

            return res.status(200).json({
                ok: true,
                accessToken: token
            })

        } catch (e) {
            if (e instanceof PhoneNotRegistered) return res.status(404).json({ ok: false, message: e.getMessage() })
            if (e instanceof InvalidCredentialsError) return res.status(401).json({ ok: false, message: e.getMessage() })

            console.error(e)
            return res.status(500).send()
        }
    }
}