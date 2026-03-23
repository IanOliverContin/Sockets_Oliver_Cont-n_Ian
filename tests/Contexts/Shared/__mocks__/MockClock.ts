import { Clock } from '@Shared/domain/Clock'
import { mockFn } from '../../../mockUtils'

export class MockClock implements Clock {
  private mockNow = mockFn()

  private currentDate: Date = new Date()

  async now (): Promise<Date> {
    this.mockNow()
    return this.currentDate
  }

  returnOnNow (date: Date): void {
    this.currentDate = date
  }
}
