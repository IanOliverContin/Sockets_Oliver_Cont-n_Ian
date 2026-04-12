import { DomainError } from "@Shared/domain/Errors/DomainError";

export class UserNotFound extends DomainError {
    protected code: string = 'user-not-found'
    protected message: string

    constructor() {
        super()
        this.message = `User Not Found`
    }
}