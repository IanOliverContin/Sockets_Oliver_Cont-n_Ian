import { InvalidArgumentError } from "@Shared/domain/ValueObjects/InvalidArgumentError";

export class InvalidPasswordFormat extends InvalidArgumentError {
    protected code: string = 'invalid-password-format'
    protected message: string

    constructor(value: string) {
        super(value);
        this.message = `Invalid password format: ${value}`;
    }
}