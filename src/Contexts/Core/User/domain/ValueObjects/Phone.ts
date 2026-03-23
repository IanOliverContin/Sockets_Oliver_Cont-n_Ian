import { StringValueObject } from "@Shared/domain/ValueObjects/StringValueObject";
import { InvalidPhoneFormat } from "../Errors/InvalidPhoneFormat";

export class Phone extends StringValueObject {
    constructor(value: string) {
        super(value);
    }

    public static create(value: string): Phone {
        this.checkIfItsValid(value);
        return new Phone(value);
    }

    private static checkIfItsValid(value: string): void {
        const phoneRegex = /^\+?[1-9]\d{1,14}$/;
        if (!phoneRegex.test(value)) throw new InvalidPhoneFormat(value);
    }
}