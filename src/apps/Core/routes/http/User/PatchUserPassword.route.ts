import { Request, Response, Router } from 'express'
import DI from '@Apps/Core/dependencyInjection/DI'
import { UserPatchPasswordController } from '@Apps/Core/controllers/http/User/UserPatchPasswordController'
import { AuthMiddleware } from '@Apps/Core/middleware/AuthMiddleware'

export const register = (router: Router) => {
    const controller = DI.getInstance().resolve<UserPatchPasswordController>('Apps.Core.Controllers.UserPatchPasswordController')
    const auth = DI.getInstance().resolve<AuthMiddleware>('Apps.Core.Middlewares.AuthMiddleware')

    router.patch('/v1/users/password',
        (req, res, next) => auth.run(req, res, next),
        (req: Request, res: Response) => controller.run(req, res)
    )
}
