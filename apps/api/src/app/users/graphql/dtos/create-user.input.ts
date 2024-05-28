import { Field, InputType, PickType, registerEnumType } from '@nestjs/graphql'
import { User } from '../entity/user.entity'
import { AuthProviderType } from '@prisma/client'

registerEnumType(AuthProviderType, {
  name: 'AuthProviderType',
})

@InputType()
export class RegisterWithProviderInput extends PickType(User, ['name', 'uid', 'image'], InputType) {
  @Field(() => AuthProviderType)
  type: AuthProviderType
}

@InputType()
export class RegisterWithCredentialsInput {
  name: string
  email: string
  password: string
  image?: string
}