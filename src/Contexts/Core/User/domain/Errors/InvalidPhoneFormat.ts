import { InvalidArgumentError } from "@Shared/domain/ValueObjects/InvalidArgumentError";

export class InvalidPhoneFormat extends InvalidArgumentError {
    protected code: string = 'invalid-phone-format'
    protected message: string

    constructor(value: string) {
        super(value);
        this.message = `Invalid phone number format: ${value}, it must start with a '+' and contain only numbers.`;
    }
}