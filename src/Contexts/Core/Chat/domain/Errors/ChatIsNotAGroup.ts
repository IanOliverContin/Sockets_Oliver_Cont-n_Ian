import { DomainError } from "@Shared/domain/Errors/DomainError";

export class ChatIsNotAGroup extends DomainError {
    protected code = 'chat-not-a-group'
    protected message: string

    constructor(value: string) {
        super()
        this.message = `The chat ${value} is not a group`
    }
}