import { MotherCreator } from '@Tests/Contexts/Shared/domain/MotherCreator'

type Params = {
	min?: number
	max?: number
	precision?: number
}

export class FloatMother {
  static random ({ min, max, precision = 0.2 }: Params = {}): number {
    return MotherCreator.random().datatype.float({ min, max, precision })
  }
}
