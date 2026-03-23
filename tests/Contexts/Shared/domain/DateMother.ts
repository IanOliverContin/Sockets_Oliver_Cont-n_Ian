import { MotherCreator } from '@Tests/Contexts/Shared/domain/MotherCreator'

export class DateMother {
  private static readonly creator = MotherCreator.random().date

  static past (): Date {
    return this.creator.past()
  }

  static before (date: Date): Date {
    return this.creator.past(undefined, date)
  }

  static future (): Date {
    return this.creator.future()
  }

  static after (date: Date): Date {
    return this.creator.future(undefined, date)
  }

  static now (): Date {
    return new Date()
  }

  static daysAgo (days: number): Date {
    const now = this.now()
    return new Date(now.setDate(now.getDate() - days))
  }
}
