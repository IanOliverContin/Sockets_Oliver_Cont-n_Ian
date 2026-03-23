import { DomainError } from "@Shared/domain/Errors/DomainError";

export class PasswordNotMatchException extends DomainError {
    protected code: string = 'password-not-match'
    protected message: string

    constructor(password: string) {
        super()
        this.message = `Password ${password} does not match`
    }
}