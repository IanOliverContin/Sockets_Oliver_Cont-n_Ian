import { DomainError } from "@Shared/domain/Errors/DomainError";

export class UserAlreadyExistsById extends DomainError {
    protected code: string = 'user-already-exists-by-id'
    protected message: string

    constructor(id: string) {
        super()
        this.message = `User with id ${id} already exists`
    }
}