import { DomainError } from '@Shared/domain/Errors/DomainError'

export class NoMinPoints extends DomainError {
  protected code = 'no-min-points'
  protected message

  constructor (value: number) {
    super()
    this.message = `You don't have the necessary points to do this. You have: ${value} points`
  }
}
