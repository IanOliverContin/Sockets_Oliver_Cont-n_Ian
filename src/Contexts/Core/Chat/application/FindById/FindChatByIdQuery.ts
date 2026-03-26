import { Query } from "@Shared/domain/QueryBus/Query";

export class FindChatByIdQuery implements Query {
    constructor(readonly id: string) { }
}