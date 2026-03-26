import { QueryHandler } from "@Shared/domain/QueryBus/QueryHandler";
import { Query } from "@Shared/domain/QueryBus/Query";
import { FindRoomByIdQuery } from "./FindRoomByIdQuery";
import { Finder } from "./Finder";
import { Id } from "@Core/Room/domain/ValueObjects/Id";
import { RoomResponse } from "../RoomResponse";

export class FindRoomByIdQueryHandler implements QueryHandler<FindRoomByIdQuery, RoomResponse> {
    constructor(private readonly finder: Finder) { }

    subscribedTo(): Query {
        return FindRoomByIdQuery
    }

    async handle(query: FindRoomByIdQuery): Promise<RoomResponse> {
        return new RoomResponse(await this.finder.run(new Id(query.id)))
    }
}