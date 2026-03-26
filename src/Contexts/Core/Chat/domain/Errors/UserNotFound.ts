import { DomainError } from "@Shared/domain/Errors/DomainError";

export class UserNotFound extends DomainError {
    protected code: string = 'user-not-found'
    protected message: string

    constructor(phone: string) {
        super()
        this.message = `User with phone ${phone} not found`
    }
}