import { Query } from "@Shared/domain/QueryBus/Query";

export class LoginQuery implements Query {
    constructor(
        public readonly phone: string,
        public readonly password: string
    ) { }
}