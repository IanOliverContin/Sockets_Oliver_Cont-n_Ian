import { DomainError } from '@Shared/domain/Errors/DomainError'

export class InvalidRole extends DomainError {
  protected code = 'invalid-role'
  protected message

  constructor (value: string) {
    super()
    this.message = `The role ${value} is not valid`
  }
}
