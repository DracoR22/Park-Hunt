import { Field, InputType, PartialType } from '@nestjs/graphql'
import { Prisma } from '@prisma/client'
import { RestrictProperties } from 'src/common/dtos/common.input'
import { BookingTimelineOrderByRelationAggregateInput } from 'src/app/booking-timelines/graphql/dtos/order-by.args'
import { CompanyOrderByWithRelationInput } from 'src/app/companies/graphql/dtos/order-by.args'
import { UserOrderByWithRelationInput } from 'src/app/users/graphql/dtos/order-by.args'
import { ValetAssignmentOrderByRelationAggregateInput } from 'src/app/valet-assignments/graphql/dtos/order-by.args'

@InputType()
export class ValetOrderByWithRelationInputStrict
  implements RestrictProperties<ValetOrderByWithRelationInputStrict, Prisma.ValetOrderByWithRelationInput>
{
  User: UserOrderByWithRelationInput
  @Field(() => Prisma.SortOrder)
  uid: Prisma.SortOrder
  @Field(() => Prisma.SortOrder)
  createdAt: Prisma.SortOrder
  @Field(() => Prisma.SortOrder)
  updatedAt: Prisma.SortOrder
  @Field(() => Prisma.SortOrder)
  displayName: Prisma.SortOrder
  @Field(() => Prisma.SortOrder)
  image: Prisma.SortOrder
  @Field(() => Prisma.SortOrder)
  licenceID: Prisma.SortOrder
  @Field(() => Prisma.SortOrder)
  companyId: Prisma.SortOrder
  Company: CompanyOrderByWithRelationInput
  BookingTimeline: BookingTimelineOrderByRelationAggregateInput
  PickupAssignments: ValetAssignmentOrderByRelationAggregateInput
  ReturnAssignments: ValetAssignmentOrderByRelationAggregateInput
  // Todo: Add below field decorator to the SortOrder properties.
  // @Field(() => Prisma.SortOrder)
}

@InputType()
export class ValetOrderByWithRelationInput extends PartialType(ValetOrderByWithRelationInputStrict) {}

@InputType()
export class ValetOrderByRelationAggregateInput {
  @Field(() => Prisma.SortOrder)
  _count?: Prisma.SortOrder
}
