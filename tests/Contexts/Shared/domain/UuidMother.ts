import { MotherCreator } from '@Tests/Contexts/Shared/domain/MotherCreator'

export class UuidMother {
  static random (): string {
    return MotherCreator.random().string.uuid()
  }
}
