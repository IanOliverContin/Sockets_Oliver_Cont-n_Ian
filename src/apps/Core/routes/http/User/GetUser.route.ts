import { Request, Response, Router } from 'express'
import DI from '@Apps/Core/dependencyInjection/DI'
import { UserGetByIdController } from '@Apps/Core/controllers/http/User/UserGetByIdController'
import { AuthMiddleware } from '@Apps/Core/middleware/AuthMiddleware'

export const register = (router: Router) => {
    const controller = DI.getInstance().resolve<UserGetByIdController>('Apps.Core.Controllers.UserGetByIdController')
    const auth = DI.getInstance().resolve<AuthMiddleware>('Apps.Core.Middlewares.AuthMiddleware')

    router.get('/v1/users/:id',
        (req, res, next) => auth.run(req, res, next),
        (req: Request, res: Response) => controller.run(req, res)
    )
}
