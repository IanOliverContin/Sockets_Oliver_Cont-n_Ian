import { DomainEvent } from '@Shared/domain/DomainEvent'
import { DomainEventSubscriber } from '@Shared/domain/DomainEventSubscriber'
import { EventBus } from '@Shared/domain/EventBus'
import { DomainEventMapping } from '@Shared/infrastructure/EventBus/DomainEventMapping'
import { mockFn } from '../../../mockUtils'

export default class EventBusMock implements EventBus {
  private publishSpy = mockFn()

  async publish (events: DomainEvent[]) {
    this.publishSpy(events)
  }

  async start (): Promise<void> {}

  addSubscribers (subscribers: DomainEventSubscriber<DomainEvent>[]): void {}

  setDomainEventMapping (domainEventMapping: DomainEventMapping): void {}

  assertLastPublishedEventIs (expectedEvent: DomainEvent) {
    const publishSpyCalls = this.publishSpy.mock.calls

    expect(publishSpyCalls.length).toBeGreaterThan(0)

    const lastPublishSpyCall = publishSpyCalls[publishSpyCalls.length - 1]
    const lastPublishedEvent = lastPublishSpyCall[0][0]

    expect(this.getDataFromDomainEvent(expectedEvent)).toMatchObject(
      this.getDataFromDomainEvent(lastPublishedEvent)
    )
  }

  assertEventHasBeenPublished<E extends DomainEvent> (expectedEvent: E) {
    const publishSpyCalls = this.publishSpy.mock.calls

    expect(publishSpyCalls.length).toBeGreaterThan(0)

    const lastPublishSpyCall = publishSpyCalls[publishSpyCalls.length - 1]
    const call = lastPublishSpyCall[0].find(
      (event: E) => event.eventName === expectedEvent.eventName
    )

    expect(call).toBeDefined()

    expect(this.getDataFromDomainEvent(expectedEvent)).toMatchObject(
      this.getDataFromDomainEvent(call)
    )
  }

  assertEventHasNotBeenPublished<E extends DomainEvent> (expectedEvent: E) {
    const publishSpyCalls = this.publishSpy.mock.calls

    expect(publishSpyCalls.length).toBeGreaterThan(0)

    const lastPublishSpyCall = publishSpyCalls[publishSpyCalls.length - 1]
    const call = lastPublishSpyCall[0].find(
      (event: E) => event.eventName === expectedEvent.eventName
    )

    expect(call).not.toBeDefined()
  }

  assertPublishHasBeenCalledWith<E extends DomainEvent> (expected: E) {
    const allPublishedEvents = this.publishSpy.mock.calls.map((c) =>
      this.getDataFromDomainEvent(c[0][0])
    )
    expect(allPublishedEvents).toContainEqual(this.getDataFromDomainEvent(expected))
  }

  assertNonEventHasBeenPublished () {
    expect(this.publishSpy.mock.calls.length).toBe(0)
  }

  assertNoActualEventsHaveBeenPublished () {
    const allPublishedEvents = this.publishSpy.mock.calls.flatMap((call) => call[0])
    expect(allPublishedEvents.length).toBe(0)
  }

  assertEventWithNameHasBeenPublished (eventName: string) {
    const allPublishedEvents = this.publishSpy.mock.calls.flatMap((call) => call[0])
    const eventWithName = allPublishedEvents.find((event) => event.eventName === eventName)
    expect(eventWithName).toBeDefined()
  }

  assertEventWithNameHasNotBeenPublished (eventName: string) {
    const allPublishedEvents = this.publishSpy.mock.calls.flatMap((call) => call[0])
    const eventWithName = allPublishedEvents.find((event) => event.eventName === eventName)
    expect(eventWithName).toBeUndefined()
  }

  private getDataFromDomainEvent (event: DomainEvent) {
    const { eventId, occurredOn, ...attributes } = event

    return attributes
  }

  assertPublishHasNotBeenCalled (): void {
    expect(this.publishSpy).not.toHaveBeenCalled()
  }

  assertPublishHasNotBeenCalledWith<E extends DomainEvent> (expected: E) {
    const allPublishedEvents = this.publishSpy.mock.calls.map((c) =>
      this.getDataFromDomainEvent(c[0][0])
    )
    expect(allPublishedEvents).not.toContainEqual(this.getDataFromDomainEvent(expected))
  }
}
