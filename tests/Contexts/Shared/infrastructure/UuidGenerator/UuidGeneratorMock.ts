import { UuidGenerator } from '@Shared/domain/UuidGenerator'

export class UuidGeneratorMock implements UuidGenerator {
  private id = ''

  returnOnGenerate (id: string): void {
    this.id = id
  }

  generate (): string {
    return this.id
  }
}
