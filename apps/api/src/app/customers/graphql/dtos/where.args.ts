import { Field, InputType, PartialType } from '@nestjs/graphql'
import { Prisma } from '@prisma/client'
import { DateTimeFilter, RestrictProperties, StringFilter } from 'src/common/dtos/common.input'
import { BookingListRelationFilter } from 'src/app/bookings/graphql/dtos/where.args'
import { ReviewListRelationFilter } from 'src/app/reviews/graphql/dtos/where.args'
import { UserRelationFilter } from 'src/app/users/graphql/dtos/where.args'

@InputType()
export class CustomerWhereUniqueInput {
  uid: string
}

@InputType()
export class CustomerWhereInputStrict
  implements RestrictProperties<CustomerWhereInputStrict, Prisma.CustomerWhereInput>
{
  User: UserRelationFilter
  uid: StringFilter
  createdAt: DateTimeFilter
  updatedAt: DateTimeFilter
  displayName: StringFilter
  Bookings: BookingListRelationFilter
  Reviews: ReviewListRelationFilter

  AND: CustomerWhereInput[]
  OR: CustomerWhereInput[]
  NOT: CustomerWhereInput[]
}

@InputType()
export class CustomerWhereInput extends PartialType(CustomerWhereInputStrict) {}

@InputType()
export class CustomerListRelationFilter {
  every?: CustomerWhereInput
  some?: CustomerWhereInput
  none?: CustomerWhereInput
}

@InputType()
export class CustomerRelationFilter {
  is?: CustomerWhereInput
  isNot?: CustomerWhereInput
}
