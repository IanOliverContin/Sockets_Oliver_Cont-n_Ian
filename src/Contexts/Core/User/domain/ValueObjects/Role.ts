import { EnumValueObject } from '@Shared/domain/ValueObjects/EnumValueObject'
import { InvalidRole } from '../Errors/InvalidRole'

export enum AVAILABLE_ROLES {
    'MEMBER',
    'PUBLISHER',
    'ADMIN'
}

export class Role extends EnumValueObject<AVAILABLE_ROLES> {
  constructor (value: AVAILABLE_ROLES) {
    super(value, Object.values(AVAILABLE_ROLES) as AVAILABLE_ROLES[])
  }

  protected throwErrorForInvalidValue (value: AVAILABLE_ROLES): void {
    throw new InvalidRole(value as unknown as string)
  }
}
