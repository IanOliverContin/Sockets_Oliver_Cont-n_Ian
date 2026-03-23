import { AggregateRoot } from "@Shared/domain/AggregateRoot";
import { Id } from "./ValueObjects/Id";
import { Name } from "./ValueObjects/Name";
import { Password } from "./ValueObjects/Password";
import { CreatedAt } from "./ValueObjects/CreatedAt";
import { UpdatedAt } from "./ValueObjects/UpdatedAt";
import { DeletedAt } from "./ValueObjects/DeletedAt";
import { Nullable } from "@Shared/domain/Nullable";
import { Phone } from "./ValueObjects/Phone";

export class User extends AggregateRoot {
    constructor(
        readonly id: Id,
        readonly name: Name,
        readonly phone: Phone,
        readonly password: Password,
        readonly createdAt: CreatedAt,
        readonly updatedAt: UpdatedAt,
        readonly deletedAt: Nullable<DeletedAt>
    ) {
        super();
    }


    static create(
        id: Id,
        name: Name,
        phone: Phone,
        password: Password
    ): User {
        return new User(
            id,
            name,
            phone,
            password,
            new CreatedAt(new Date()),
            new UpdatedAt(new Date()),
            null
        );
    }

    updateName(name: Name): User {
        return new User(
            this.id,
            name,
            this.phone,
            this.password,
            this.createdAt,
            new UpdatedAt(new Date()),
            this.deletedAt
        );
    }

    updatePhone(phone: Phone): User {
        return new User(
            this.id,
            this.name,
            phone,
            this.password,
            this.createdAt,
            new UpdatedAt(new Date()),
            this.deletedAt
        );
    }

    updatePassword(password: Password): User {
        return new User(
            this.id,
            this.name,
            this.phone,
            password,
            this.createdAt,
            new UpdatedAt(new Date()),
            this.deletedAt
        );
    }

    delete(): User {
        return new User(
            this.id,
            this.name,
            this.phone,
            this.password,
            this.createdAt,
            new UpdatedAt(new Date()),
            new DeletedAt(new Date())
        );
    }
}