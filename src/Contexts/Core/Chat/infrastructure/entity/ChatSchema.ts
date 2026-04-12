import { Id } from '@Core/Chat/domain/ValueObjects/Id'
import { Name } from '@Core/Chat/domain/ValueObjects/Name'
import { ValueObjectTransformer } from '@Shared/domain/ValueObjects/ValueObjectTransformer'
import { EntitySchema } from 'typeorm'
import { CreatedAt } from '@Core/Chat/domain/ValueObjects/CreatedAt'
import { UpdatedAt } from '@Core/Chat/domain/ValueObjects/UpdatedAt'
import { DeletedAt } from '@Core/Chat/domain/ValueObjects/DeletedAt'
import { AdminId } from '@Core/Chat/domain/ValueObjects/AdminId'
import { Description } from '@Core/Chat/domain/ValueObjects/Description'
import { IsGroup } from '@Core/Chat/domain/ValueObjects/IsGroup'
import { Chat } from '@Core/Chat/domain/Chat'

export const ChatSchema = new EntitySchema<Chat>({
    name: 'Chat',
    target: Chat,
    tableName: 'chat',
    columns: {
        id: {
            type: 'varchar',
            primary: true,
            transformer: ValueObjectTransformer(Id)
        },
        name: {
            type: 'varchar',
            nullable: true,
            transformer: ValueObjectTransformer(Name)
        },
        description: {
            type: 'varchar',
            transformer: ValueObjectTransformer(Description)
        },
        isGroup: {
            type: 'boolean',
            transformer: ValueObjectTransformer(IsGroup)
        },
        adminId: {
            type: 'varchar',
            transformer: ValueObjectTransformer(AdminId)
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
            name: 'IDX_CHAT_ID',
            columns: ['id']
        },
        {
            name: 'IDX_CHAT_NAME',
            columns: ['name']
        },
        {
            name: 'IDX_CHAT_IS_GROUP',
            columns: ['isGroup']
        }
    ]
})
