import { QueryHandler } from "@Shared/domain/QueryBus/QueryHandler";
import { Query } from "@Shared/domain/QueryBus/Query";
import { FindChatByIdQuery } from "./FindChatByIdQuery";
import { Finder } from "./Finder";
import { Id } from "@Core/Chat/domain/ValueObjects/Id";
import { ChatResponse } from "../ChatResponse";

export class FindChatByIdQueryHandler implements QueryHandler<FindChatByIdQuery, ChatResponse> {
    constructor(private readonly finder: Finder) { }

    subscribedTo(): Query {
        return FindChatByIdQuery
    }

    async handle(query: FindChatByIdQuery): Promise<ChatResponse> {
        return new ChatResponse(await this.finder.run(new Id(query.id)))
    }
}