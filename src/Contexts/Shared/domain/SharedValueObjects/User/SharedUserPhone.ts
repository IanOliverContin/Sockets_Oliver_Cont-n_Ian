import { StringValueObject } from "@Shared/domain/ValueObjects/StringValueObject";
import { SharedInvalidPhoneFormat } from "@Shared/domain/Errors/User/SharedInvalidPhoneFromat";

export class SharedUserPhone extends StringValueObject {
    constructor(value: string) {
        super(value);
    }

    public static create(value: string): SharedUserPhone {
        this.checkIfItsValid(value);
        return new SharedUserPhone(value);
    }

    private static checkIfItsValid(value: string): void {
        const phoneRegex = /^\+?[1-9]\d{1,14}$/;
        if (!phoneRegex.test(value)) throw new SharedInvalidPhoneFormat(value);
    }
}