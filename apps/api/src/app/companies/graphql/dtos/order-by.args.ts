import { Field, InputType, PartialType } from '@nestjs/graphql'
import { Prisma } from '@prisma/client'
import { RestrictProperties } from 'src/common/dtos/common.input'
import { GarageOrderByRelationAggregateInput } from 'src/app/garages/graphql/dtos/order-by.args'
import { ManagerOrderByRelationAggregateInput } from 'src/app/managers/graphql/dtos/order-by.args'
import { ValetOrderByRelationAggregateInput } from 'src/app/valets/graphql/dtos/order-by.args'

@InputType()
export class CompanyOrderByWithRelationInputStrict
  implements RestrictProperties<CompanyOrderByWithRelationInputStrict, Prisma.CompanyOrderByWithRelationInput>
{
  @Field(() => Prisma.SortOrder)
  id: Prisma.SortOrder
  @Field(() => Prisma.SortOrder)
  createdAt: Prisma.SortOrder
  @Field(() => Prisma.SortOrder)
  updatedAt: Prisma.SortOrder
  @Field(() => Prisma.SortOrder)
  displayName: Prisma.SortOrder
  @Field(() => Prisma.SortOrder)
  description: Prisma.SortOrder
  Garages: GarageOrderByRelationAggregateInput
  Managers: ManagerOrderByRelationAggregateInput
  Valets: ValetOrderByRelationAggregateInput
  // Todo: Add below field decorator to the SortOrder properties.
  // @Field(() => Prisma.SortOrder)
}

@InputType()
export class CompanyOrderByWithRelationInput extends PartialType(CompanyOrderByWithRelationInputStrict) {}

@InputType()
export class CompanyOrderByRelationAggregateInput {
  @Field(() => Prisma.SortOrder)
  _count?: Prisma.SortOrder
}
