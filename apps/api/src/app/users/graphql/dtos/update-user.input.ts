import { RegisterWithCredentialsInput } from './create-user.input'
import { InputType, PartialType } from '@nestjs/graphql'
import { User } from '@prisma/client'

@InputType()
export class UpdateUserInput extends PartialType(RegisterWithCredentialsInput) {
  uid: User['uid']
}
