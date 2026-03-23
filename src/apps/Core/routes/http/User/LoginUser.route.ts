import { Request, Response, Router } from 'express'
import DI from '@Apps/Core/dependencyInjection/DI'
import { UserLoginPostController } from '@Apps/Core/controllers/http/User/UserLoginPostController'

export const register = (router: Router) => {
    const controller = DI.getInstance().resolve<UserLoginPostController>('Apps.Core.Controllers.UserLoginPostController')

    router.post('/v1/users/login',
        (req: Request, res: Response) => controller.run(req, res)
    )
}
