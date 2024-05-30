import { Field, InputType, PartialType } from '@nestjs/graphql'
import { Prisma } from '@prisma/client'
import { DateTimeFilter, IntFilter, RestrictProperties, StringFilter } from 'src/common/dtos/common.input'
import { BookingTimelineListRelationFilter } from 'src/app/booking-timelines/graphql/dtos/where.args'
import { CompanyRelationFilter } from 'src/app/companies/graphql/dtos/where.args'
import { UserRelationFilter } from 'src/app/users/graphql/dtos/where.args'
import { ValetAssignmentListRelationFilter } from 'src/app/valet-assignments/graphql/dtos/where.args'

@InputType()
export class ValetWhereUniqueInput {
  uid: string
}

@InputType()
export class ValetWhereInputStrict implements RestrictProperties<ValetWhereInputStrict, Prisma.ValetWhereInput> {
  User: UserRelationFilter
  uid: StringFilter
  createdAt: DateTimeFilter
  updatedAt: DateTimeFilter
  displayName: StringFilter
  image: StringFilter
  licenceID: StringFilter
  companyId: IntFilter
  Company: CompanyRelationFilter
  BookingTimeline: BookingTimelineListRelationFilter
  PickupAssignments: ValetAssignmentListRelationFilter
  ReturnAssignments: ValetAssignmentListRelationFilter

  AND: ValetWhereInput[]
  OR: ValetWhereInput[]
  NOT: ValetWhereInput[]
}

@InputType()
export class ValetWhereInput extends PartialType(ValetWhereInputStrict) {}

@InputType()
export class ValetListRelationFilter {
  every?: ValetWhereInput
  some?: ValetWhereInput
  none?: ValetWhereInput
}

@InputType()
export class ValetRelationFilter {
  is?: ValetWhereInput
  isNot?: ValetWhereInput
}
