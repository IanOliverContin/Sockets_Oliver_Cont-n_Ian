import { Request, Response } from 'express'
import { Controller } from '../../@types/Controller'
import { CommandBus } from '@Shared/domain/CommandBus/CommandBus'
import { CannotDecode } from '@Shared/domain/TokenDecoder/Errors/CannotDecode'
import { UpdateRoleCommand } from '@Core/User/application/UpdateRole/UpdateRoleCommand'
import { UserNotFound } from '@Core/User/domain/Errors/UserNotFound'
import { InvalidRole } from '@Core/User/domain/Errors/InvalidRole'

export class UserRolePatchController implements Controller {
  constructor (private readonly commandBus: CommandBus) {}

  async run (req: Request, res: Response): Promise<Response> {
    try {
      const command = new UpdateRoleCommand(
        req.params.id,
        req.body.role
      )

      await this.commandBus.dispatch(command)

      return res.status(204).send()
    } catch (e) {
      if (e instanceof UserNotFound) return res.status(404).json({ message: e.getMessage() })
      if (e instanceof InvalidRole) return res.status(400).json({ message: e.getMessage() })
      if (e instanceof CannotDecode) return res.status(401).json({ message: e.getMessage() })

      return res.status(500).send()
    }
  }
}
