import { DomainError } from "@Shared/domain/Errors/DomainError";

export class InvalidCredentialsError extends DomainError {
    readonly code = 'invalid-credentials'
    readonly message: string;

    constructor() {
        super()
        this.message = `Phone or password invalid`
    }
}