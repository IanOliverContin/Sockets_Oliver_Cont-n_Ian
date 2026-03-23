import { Command } from '@Shared/domain/Command'
import { CommandBus } from '@Shared/domain/CommandBus'
import { DomainError } from '@Shared/domain/DomainError'
import { Nullable, isNullOrUndefined } from '@Shared/domain/Nullable'
import { mockFn } from '../../../mockUtils'

export class CommandBusMock implements CommandBus {
  private mockDispatch = mockFn()
  private mockDomainError: Nullable<DomainError>

  async dispatch<C extends Command> (command: C): Promise<void> {
    this.mockDispatch(command)
    if (!isNullOrUndefined(this.mockDomainError)) {
      const error = this.mockDomainError
      this.mockDomainError = null
      throw error
    }
  }

  assertDispatchHasBeenCalledWith<C extends Command> (command: C): void {
    expect(this.mockDispatch).toHaveBeenCalledWith(command)
  }

  assertDispatchHasNotBeenCalledWith<C extends Command> (command: C): void {
    expect(this.mockDispatch).not.toHaveBeenCalledWith(command)
  }

  throwOnDispatch<E extends DomainError> (error: E) {
    this.mockDomainError = error
  }
}
