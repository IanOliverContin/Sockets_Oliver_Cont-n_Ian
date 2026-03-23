import { QueryBus } from '@Shared/domain/QueryBus'
import { Query } from '@Shared/domain/Query'
import { Response } from '@Shared/domain/Response'
import { mockFn } from '../../../mockUtils'

export class MockQueryBus implements QueryBus {
  private readonly mockAsk = mockFn()

  async ask<R extends Response> (query: Query): Promise<R> {
    return this.mockAsk(query) as R
  }

  returnOnAsk<R extends Response> (response: R): void {
    this.mockAsk.mockResolvedValueOnce(response)
  }

  failOnAsk<E extends Error> (error: E): void {
    this.mockAsk.mockRejectedValueOnce(error)
  }
}
