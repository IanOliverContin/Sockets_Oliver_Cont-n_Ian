import { Request, Response } from 'express'
import { Controller } from '../../@types/Controller'
import { CommandBus } from '@Shared/domain/CommandBus/CommandBus'
import { CannotDecode } from '@Shared/domain/TokenDecoder/Errors/CannotDecode'
import { CreateUserCommand } from '@Core/User/application/Create/CreateUserCommand'
import { UserAlreadyExistsByEmail } from '@Core/User/domain/Errors/UserAlreadyExistsByEmail'
import { UserAlreadyExistsById } from '@Core/User/domain/Errors/UserAlreadyExistsById'

export class RegisterPostController implements Controller {
  constructor (private readonly commandBus: CommandBus) {}

  async run (req: Request, res: Response): Promise<Response> {
    try {
      if (!req.headers.authorization) return res.status(401).send()
      const command = new CreateUserCommand(
        req.params.id,
        req.body.name,
        req.body.email,
        req.body.password
      )

      await this.commandBus.dispatch(command)

      return res.status(201).send()
    } catch (e) {
      if (e instanceof CannotDecode) return res.status(401).send(e.getMessage())
      if (e instanceof UserAlreadyExistsById) return res.status(400).send(e.getMessage())
      if (e instanceof UserAlreadyExistsByEmail) return res.status(400).send(e.getMessage())

      return res.status(500).send()
    }
  }
}
