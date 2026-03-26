import { Query } from "@Shared/domain/QueryBus/Query";

export class FindRoomByIdQuery implements Query {
    constructor(readonly id: string) { }
}