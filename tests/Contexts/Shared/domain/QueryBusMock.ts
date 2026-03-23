import { DomainError } from '@Shared/domain/DomainError'
import { Query } from '@Shared/domain/Query'
import { QueryBus } from '@Shared/domain/QueryBus'
import { Response } from '@Shared/domain/Response'
import { mockFn } from '../../../mockUtils'

export class QueryBusMock implements QueryBus {
  private mockAsk = mockFn()

  private response?: Response
  private fail?: DomainError

  private responseByQuery = new Map<Query, Response>([])
  private failByQuery = new Map<Query, Error>([])
  private responseStack: Response[] = []

  private responseMap = new Map<string, Response>()

  async ask<R extends Response> (query: Query): Promise<R> {
    this.mockAsk(query)

    const queryKey = this.getQueryKey(query)
    if (this.responseMap.has(queryKey)) {
      return this.responseMap.get(queryKey) as R
    }

    if (this.fail) {
      const error = this.fail
      this.fail = undefined
      throw error
    }

    if (this.failByQuery.has(query.constructor.name)) {
      throw this.failByQuery.get(query.constructor.name)
    }

    if (this.responseByQuery.has(query.constructor.name)) {
      return this.responseByQuery.get(query.constructor.name) as R
    }

    if (this.responseStack.length > 0) return this.responseStack.pop() as R

    return this.response as R
  }

  returnOnAsk<R extends Response> (response: R): void {
    this.response = response
  }

  pushOnStack<R extends Response> (response: R[]): void {
    this.responseStack.push(...response)
  }

  returnOnQuery<Q extends Query, R extends Response> (query: Q, response: R): void {
    this.responseByQuery.set(query.constructor.name, response)
  }

  failOnQuery<Q extends Query, E extends DomainError> (query: Q, error: E): void {
    this.failByQuery.set(query.constructor.name, error)
  }

  failOnAsk<E extends DomainError> (error: E): void {
    this.fail = error
  }

  returnForInstance<Q extends Query, R extends Response> (query: Q, response: R): void {
    const queryKey = this.getQueryKey(query)
    this.responseMap.set(queryKey, response)
  }

  assertAskHasNotBeenCalled (): void {
    expect(this.mockAsk).not.toHaveBeenCalled()
  }

  private getQueryKey (query: Query): string {
    return JSON.stringify(query)
  }

  assertAskHasBeenCalledWith<Q extends Query> (query: Q): void {
    expect(this.mockAsk).toHaveBeenCalledWith(query)
  }
}
