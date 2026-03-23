import { AVAILABLE_ROLES } from '@Core/User/domain/ValueObjects/Role'
import { Command } from '@Shared/domain/CommandBus/Command'

export class UpdateRoleCommand implements Command {
  constructor (
      readonly id: string,
      readonly role: AVAILABLE_ROLES
  ) {}
}
