import { StringValueObject } from '@Shared/domain/ValueObjects/StringValueObject'
import { InvalidPasswordLength } from '../Errors/InvalidPasswordLength'

export class Password extends StringValueObject {
  static create (password: string): Password {
    if (password.length < 8) {
      throw new InvalidPasswordLength(password)
    }

    return new Password(password)
  }
}
