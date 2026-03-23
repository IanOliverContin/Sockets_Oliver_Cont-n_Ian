import { User } from '@Core/User/domain/User'
import { Id } from '@Core/User/domain/ValueObjects/Id'
import { Name } from '@Core/User/domain/ValueObjects/Name'
import { ValueObjectTransformer } from '@Shared/domain/ValueObjects/ValueObjectTransformer'
import { EntitySchema } from 'typeorm'
import { CreatedAt } from '@Core/User/domain/ValueObjects/CreatedAt'
import { UpdatedAt } from '@Core/User/domain/ValueObjects/UpdatedAt'
import { DeletedAt } from '@Core/User/domain/ValueObjects/DeletedAt'
import { Username } from '@Core/User/domain/ValueObjects/Username'
import { Email } from '@Core/User/domain/ValueObjects/Email'
import { Password } from '@Core/User/domain/ValueObjects/Password'

export const UserSchema = new EntitySchema<User>({
  name: 'User',
  target: User,
  tableName: 'user',
  columns: {
    id: {
      type: String,
      primary: true,
      transformer: ValueObjectTransformer(Id)
    },
    name: {
      type: String,
      transformer: ValueObjectTransformer(Name)
    },
    username: {
      type: String,
      transformer: ValueObjectTransformer(Username)
    },
    email: {
      type: String,
      transformer: ValueObjectTransformer(Email)
    },
    password: {
      type: String,
      transformer: ValueObjectTransformer(Password)
    },
    createdAt: {
      type: Date,
      createDate: true,
      transformer: ValueObjectTransformer(CreatedAt)
    },
    updatedAt: {
      type: Date,
      updateDate: true,
      transformer: ValueObjectTransformer(UpdatedAt)
    },
    deletedAt: {
      type: Date,
      nullable: true,
      deleteDate: true,
      transformer: ValueObjectTransformer(DeletedAt)
    }
  },
  indices: [
    {
      name: 'IDX_USER_USERNAME',
      columns: ['username']
    }
  ]
})
