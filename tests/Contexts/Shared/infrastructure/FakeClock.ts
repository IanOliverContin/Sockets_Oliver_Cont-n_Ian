import { Clock } from '@Shared/domain/Clock'

export class FakeClock implements Clock {
  private currentDate = new Date()

  async now (): Promise<Date> {
    return this.currentDate
  }

  returnOnNow (date: Date): void {
    this.currentDate = date
  }
}
