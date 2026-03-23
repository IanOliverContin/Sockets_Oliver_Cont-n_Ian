import { Request, Response, Router } from 'express'
import DI from '@Apps/Core/dependencyInjection/DI'
import { UserRolePatchController } from '@Apps/Core/controllers/http/User/UserRolePatchController'

export const register = (router: Router) => {
  const controller = DI.getInstance().resolve<UserRolePatchController>('Apps.Core.Controllers.UserRolePatchController')
  router.patch('/v1/users/role/:id', (req: Request, res: Response) => controller.run(req, res))
}
