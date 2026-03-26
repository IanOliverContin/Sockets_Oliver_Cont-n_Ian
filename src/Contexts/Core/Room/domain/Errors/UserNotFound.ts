import { DomainError } from "@Shared/domain/Errors/DomainError";

export class UserNotFound extends DomainError {
    protected code: string = 'user-not-found'
    protected message: string

    constructor(id: string) {
        super()
        this.message = `User with id ${id} not found`
    }
}