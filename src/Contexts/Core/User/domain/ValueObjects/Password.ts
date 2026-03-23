import { StringValueObject } from '@Shared/domain/ValueObjects/StringValueObject'
import { InvalidPasswordFormat } from '../Errors/InvalidPasswordFormat'
import * as crypto from 'crypto'

export class Password extends StringValueObject {
    constructor(value: string) {
        super(value)
    }

    public static create(password: string): Password {
        this.checkIfItsValid(password)
        const hashed = this.encryptPassword(password)
        return new Password(hashed)
    }

    private static checkIfItsValid(value: string): void {
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/

        if (!passwordRegex.test(value)) throw new InvalidPasswordFormat(value)
    }

    private static encryptPassword(password: string): string {
        const hash = crypto.createHash('sha512');
        hash.update(password);
        return hash.digest('hex');
    }

    public compare(plainText: string): boolean {
        return this.valueOf() === Password.encryptPassword(plainText);
    }
}