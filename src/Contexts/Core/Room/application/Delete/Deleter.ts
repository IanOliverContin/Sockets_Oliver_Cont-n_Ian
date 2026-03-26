import { RoomRepository } from "@Core/Room/domain/RoomRepository";
import { Id } from "@Core/Room/domain/ValueObjects/Id";
import { RoomNotFound } from "@Core/Room/domain/Errors/RoomNotFound";

export class Deleter {
    constructor(private readonly repository: RoomRepository) { }

    async run(id: Id): Promise<void> {
        const room = await this.repository.find(id)

        if (!room) throw new RoomNotFound(id.valueOf())

        room.delete()

        await this.repository.persist(room)
    }
}