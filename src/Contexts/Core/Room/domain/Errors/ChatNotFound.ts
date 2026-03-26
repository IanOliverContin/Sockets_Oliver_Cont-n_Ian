import { DomainError } from "@Shared/domain/Errors/DomainError";

export class ChatNotFound extends DomainError {
    protected code: string = 'chat-not-found'
    protected message: string

    constructor(id: string) {
        super()
        this.message = `Chat with id ${id} not found`
    }
}