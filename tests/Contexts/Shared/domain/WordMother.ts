import { MotherCreator } from './MotherCreator'

export class WordMother {
  static random (): string {
    return MotherCreator.random().random.word()
  }
}
