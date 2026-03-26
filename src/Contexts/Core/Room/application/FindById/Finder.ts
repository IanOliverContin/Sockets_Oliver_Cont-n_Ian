import { Room } from "@Core/Room/domain/Room";
import { RoomNotFound } from "@Core/Room/domain/Errors/RoomNotFound";
import { Id } from "@Core/Room/domain/ValueObjects/Id";
import { RoomRepository } from "@Core/Room/domain/RoomRepository";

export class Finder {
    constructor(private readonly repository: RoomRepository) { }

    async run(id: Id): Promise<Room> {
        const room = await this.repository.find(id)

        if (!room) throw new RoomNotFound(id.valueOf())

        return room
    }
}