import { QueryHandler } from "@Shared/domain/QueryBus/QueryHandler";
import { Query } from "@Shared/domain/QueryBus/Query";
import { FindUserByIdQuery } from "./FindUserByIdQuery";
import { Finder } from "./Finder";
import { Id } from "@Core/User/domain/ValueObjects/Id";
import { UserResponse } from "../UserResponse";

export class FindUserByIdQueryHandler implements QueryHandler<FindUserByIdQuery, UserResponse> {
    constructor(private readonly finder: Finder) { }

    subscribedTo(): Query {
        return FindUserByIdQuery
    }

    async handle(query: FindUserByIdQuery): Promise<UserResponse> {
        return new UserResponse(await this.finder.run(new Id(query.id)))
    }
}