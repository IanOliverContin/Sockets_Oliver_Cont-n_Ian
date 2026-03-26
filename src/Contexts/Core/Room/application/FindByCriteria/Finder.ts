import { Criteria } from "@Shared/domain/Criteria/Criteria";
import { RoomRepository } from "@Core/Room/domain/RoomRepository";
import { Room } from "@Core/Room/domain/Room";

export class Finder {
    constructor(private readonly repository: RoomRepository) { }

    async run(criteria: Criteria): Promise<Room[]> {
        return await this.repository.search(criteria)
    }
}