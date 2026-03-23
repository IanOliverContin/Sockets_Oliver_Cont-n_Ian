import { Query } from '@Shared/domain/QueryBus/Query'
import { QueryHandlerInformation } from '@Shared/infrastructure/QueryBus/handler/QueryHandlerInformation'
import { QueryNotRegisteredError } from '@Shared/domain/QueryBus/QueryNotRegisteredError'
import { QueryHandler } from '@Shared/domain/QueryBus/QueryHandler'
import { QueryResponse } from '@Shared/domain/QueryBus/QueryResponse'
import { QueryBus } from '@Shared/infrastructure/QueryBus/QueryBus'

class UnhandledQuery implements Query {
  static QUERY_NAME = 'unhandled.query'
}

class HandledQuery implements Query {
  static QUERY_NAME = 'handled.query'
}

class MyQueryHandler implements QueryHandler<HandledQuery, QueryResponse<object>> {
  subscribedTo (): typeof HandledQuery {
    return HandledQuery
  }

  async handle (_query: HandledQuery): Promise<QueryResponse<object>> {
    return { response: {} }
  }
}

describe('QueryBus', () => {
  it('throws QueryNotRegisteredError when dispatching a query without handler', async () => {
    const unhandledQuery = new UnhandledQuery()
    const queryHandlerInformation = new QueryHandlerInformation([])
    const queryBus = new QueryBus(queryHandlerInformation)

    await expect(queryBus.ask(unhandledQuery)).rejects.toThrow(QueryNotRegisteredError)
  })

  it('returns response when dispatching a query with handler', async () => {
    const handledQuery = new HandledQuery()
    const myQueryHandler = new MyQueryHandler()
    const queryHandlerInformation = new QueryHandlerInformation([myQueryHandler])
    const queryBus = new QueryBus(queryHandlerInformation)

    const result = await queryBus.ask(handledQuery)

    expect(result).toEqual({ response: {} })
  })
})
