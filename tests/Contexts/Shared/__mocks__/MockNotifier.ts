import { Notification, Notifier } from '@Shared/domain/Notifier'
import { mockFn } from '../../../mockUtils'

export class MockNotifier implements Notifier {
  private readonly mockNotify = mockFn()

  async notify (notification: Notification): Promise<void> {
    this.mockNotify(notification)
  }

  assertLastSentNotificationIs (expected: Notification): void {
    expect(this.mockNotify).toHaveBeenCalledWith(expected)
  }
}
