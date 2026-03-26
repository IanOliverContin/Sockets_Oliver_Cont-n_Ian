import { DomainError } from "@Shared/domain/Errors/DomainError";

export class UserNotAdmin extends DomainError {
    protected code: string = 'user-not-admin'
    protected message: string

    constructor(value: string) {
        super()
        this.message = `The user ${value} is not admin`
    }
}