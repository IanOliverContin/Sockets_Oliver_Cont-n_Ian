import { User } from '@Core/User/domain/User'
import { Id } from '@Core/User/domain/ValueObjects/Id'
import { Name } from '@Core/User/domain/ValueObjects/Name'
import { ValueObjectTransformer } from '@Shared/domain/ValueObjects/ValueObjectTransformer'
import { EntitySchema } from 'typeorm'
import { Password } from '@Core/User/domain/ValueObjects/Password'
import { CreatedAt } from '@Core/User/domain/ValueObjects/CreatedAt'
import { UpdatedAt } from '@Core/User/domain/ValueObjects/UpdatedAt'
import { DeletedAt } from '@Core/User/domain/ValueObjects/DeletedAt'
import { Phone } from '@Core/User/domain/ValueObjects/Phone'

export const UserSchema = new EntitySchema<User>({
    name: 'User',
    target: User,
    tableName: 'user',
    columns: {
        id: {
            type: 'varchar',
            primary: true,
            transformer: ValueObjectTransformer(Id)
        },
        name: {
            type: 'varchar',
            transformer: ValueObjectTransformer(Name)
        },
        phone: {
            type: 'varchar',
            transformer: ValueObjectTransformer(Phone)
        },
        password: {
            type: 'varchar',
            transformer: ValueObjectTransformer(Password)
        },
        createdAt: {
            type: 'timestamp',
            createDate: true,
            transformer: ValueObjectTransformer(CreatedAt)
        },
        updatedAt: {
            type: 'timestamp',
            updateDate: true,
            transformer: ValueObjectTransformer(UpdatedAt)
        },
        deletedAt: {
            type: 'timestamp',
            nullable: true,
            deleteDate: true,
            transformer: ValueObjectTransformer(DeletedAt)
        }
    },
    indices: [
        {
            name: 'IDX_USER_ID',
            columns: ['id']
        },
        {
            name: 'IDX_USER_PHONE',
            columns: ['phone']
        }
    ]
})
