import { AggregateRoot } from "@Shared/domain/AggregateRoot";
import { Id } from "./ValueObjects/Id";
import { Name } from "./ValueObjects/Name";
import { Description } from "./ValueObjects/Description";
import { IsGroup } from "./ValueObjects/IsGroup";
import { AdminId } from "./ValueObjects/AdminId";
import { CreatedAt } from "./ValueObjects/CreatedAt";
import { UpdatedAt } from "./ValueObjects/UpdatedAt";
import { DeletedAt } from "./ValueObjects/DeletedAt";
import { Nullable } from "@Shared/domain/Nullable";

export class Chat extends AggregateRoot {
    constructor(
        readonly id: Id,
        readonly name: Name,
        readonly description: Nullable<Description>,
        readonly isGroup: IsGroup,
        readonly adminId: Nullable<AdminId>,
        readonly createdAt: CreatedAt,
        readonly updatedAt: UpdatedAt,
        readonly deletedAt: Nullable<DeletedAt>
    ) {
        super()
    }

    static create(
        id: Id,
        name: Name,
        description: Nullable<Description>,
        isGroup: IsGroup,
        adminId: Nullable<AdminId>,
    ): Chat {
        return new Chat(
            id,
            name,
            description,
            isGroup,
            adminId,
            new CreatedAt(new Date()),
            new UpdatedAt(new Date()),
            null
        )
    }

    updateName(name: Name): Chat {
        return new Chat(
            this.id,
            name,
            this.description,
            this.isGroup,
            this.adminId,
            this.createdAt,
            new UpdatedAt(new Date()),
            this.deletedAt
        )
    }

    updateDescription(description: Description): Chat {
        return new Chat(
            this.id,
            this.name,
            description,
            this.isGroup,
            this.adminId,
            this.createdAt,
            new UpdatedAt(new Date()),
            this.deletedAt
        )
    }

    updateAdminId(adminId: AdminId): Chat { //Si el admin se sale del grupo tiene que delegar el Admin a quien quiera del grupo
        return new Chat(
            this.id,
            this.name,
            this.description,
            this.isGroup,
            adminId,
            this.createdAt,
            new UpdatedAt(new Date()),
            this.deletedAt
        )
    }

    delete(): Chat {
        return new Chat(
            this.id,
            this.name,
            this.description,
            this.isGroup,
            this.adminId,
            this.createdAt,
            new UpdatedAt(new Date()),
            new DeletedAt(new Date())
        )
    }

}