import { DomainError } from "@Shared/domain/Errors/DomainError";

export class PhoneAlreadyRegistered extends DomainError {
    protected code: string = 'phone-already-registered'
    protected message: string

    constructor(phone: string) {
        super()
        this.message = `Phone number ${phone} is already registered`
    }
}