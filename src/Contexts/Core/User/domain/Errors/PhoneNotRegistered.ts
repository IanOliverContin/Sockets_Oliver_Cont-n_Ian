import { DomainError } from "@Shared/domain/Errors/DomainError";

export class PhoneNotRegistered extends DomainError {
    readonly code = 'phone-not-registered'
    readonly message: string;

    constructor(value: string) {
        super()
        this.message = `Phone ${value} not registered`
    }
}