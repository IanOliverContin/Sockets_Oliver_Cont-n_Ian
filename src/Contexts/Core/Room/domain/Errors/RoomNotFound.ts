import { DomainError } from "@Shared/domain/Errors/DomainError";

export class RoomNotFound extends DomainError {
    protected code: string = 'room-not-found'
    protected message: string

    constructor(id: string) {
        super()
        this.message = `Room with id ${id} not found`
    }
}