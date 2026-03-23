import { DomainEvent, DomainEventClass } from '@Shared/domain/DomainEvent'
import { DomainEventSubscriber } from '@Shared/domain/DomainEventSubscriber'

type DomainEventJson = {
	type: string
	aggregateId: string
	attributes: string
	id: string
	occurredOn: string
}

export class JsonDomainEventDeserializer extends Map<string, DomainEventClass> {
  static configure (subscribers: Array<DomainEventSubscriber<DomainEvent>>) {
    const mapping = new JsonDomainEventDeserializer()
    for (const subscriber of subscribers) {
      subscriber.subscribedTo().forEach(mapping.registerEvent.bind(mapping))
    }

    return mapping
  }

  private registerEvent (domainEvent: DomainEventClass) {
    const eventName = domainEvent.EVENT_NAME
    this.set(eventName, domainEvent)
  }

  deserialize (event: string): DomainEvent {
    const eventData: DomainEventJson = JSON.parse(event).data
    const { type, aggregateId, attributes, id, occurredOn } = eventData
    const eventClass = super.get(type)

    if (!eventClass) {
      throw Error(`DomainEvent mapping not found for event ${type}`)
    }

    return eventClass.fromPrimitives(aggregateId, attributes, id, occurredOn)
  }
}
