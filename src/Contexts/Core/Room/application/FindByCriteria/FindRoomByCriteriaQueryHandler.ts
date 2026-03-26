import { QueryHandler } from '@Shared/domain/QueryBus/QueryHandler'
import { Query } from '@Shared/domain/QueryBus/Query'
import { CriteriaHandler } from '@Shared/domain/Criteria/CriteriaHandler'
import { Finder } from './Finder'
import { FindRoomByCriteriaQuery } from './FindRoomByCriteriaQuery'
import { RoomCollectionResponse } from '../RoomCollectionResponse'

export class FindRoomByCriteriaQueryHandler extends CriteriaHandler implements QueryHandler<FindRoomByCriteriaQuery, RoomCollectionResponse> {
    constructor(private readonly finder: Finder) {
        super()
    }

    subscribedTo(): Query {
        return FindRoomByCriteriaQuery
    }

    async handle(data: FindRoomByCriteriaQuery): Promise<RoomCollectionResponse> {
        return new RoomCollectionResponse(
            await this.finder.run(this.buildCriteria(data))
        )
    }
}
