import { QueryHandler } from '@Shared/domain/QueryBus/QueryHandler'
import { FindUsersByCriteriaQuery } from './FindUserByCriteriaQuery'
import { Query } from '@Shared/domain/QueryBus/Query'
import { CriteriaHandler } from '@Shared/domain/Criteria/CriteriaHandler'
import { UserCollectionResponse } from '../UserCollectionResponse'
import { Finder } from './Finder'

export class FindUsersByCriteriaQueryHandler extends CriteriaHandler implements QueryHandler<FindUsersByCriteriaQuery, UserCollectionResponse> {
    constructor(private readonly finder: Finder) {
        super()
    }

    subscribedTo(): Query {
        return FindUsersByCriteriaQuery
    }

    async handle(data: FindUsersByCriteriaQuery): Promise<UserCollectionResponse> {
        return new UserCollectionResponse(
            await this.finder.run(this.buildCriteria(data))
        )
    }
}
