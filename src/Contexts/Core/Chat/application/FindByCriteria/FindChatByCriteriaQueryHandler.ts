import { QueryHandler } from '@Shared/domain/QueryBus/QueryHandler'
import { FindChatsByCriteriaQuery } from './FindChatByCriteriaQuery'
import { Query } from '@Shared/domain/QueryBus/Query'
import { CriteriaHandler } from '@Shared/domain/Criteria/CriteriaHandler'
import { ChatCollectionResponse } from '../ChatCollectionResponse'
import { Finder } from './Finder'

export class FindChatsByCriteriaQueryHandler extends CriteriaHandler implements QueryHandler<FindChatsByCriteriaQuery, ChatCollectionResponse> {
    constructor(private readonly finder: Finder) {
        super()
    }

    subscribedTo(): Query {
        return FindChatsByCriteriaQuery
    }

    async handle(data: FindChatsByCriteriaQuery): Promise<ChatCollectionResponse> {
        return new ChatCollectionResponse(
            await this.finder.run(this.buildCriteria(data))
        )
    }
}
