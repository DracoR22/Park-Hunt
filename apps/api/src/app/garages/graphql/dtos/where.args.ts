import { Field, InputType, PartialType } from '@nestjs/graphql'
import { Prisma } from '@prisma/client'
import {
  DateTimeFilter,
  IntFilter,
  RestrictProperties,
  StringFilter,
  StringListFilter,
} from 'src/common/dtos/common.input'
import { AddressRelationFilter } from 'src/app/addresses/graphql/dtos/where.args'
import { CompanyRelationFilter } from 'src/app/companies/graphql/dtos/where.args'
import { ReviewListRelationFilter } from 'src/app/reviews/graphql/dtos/where.args'
import { SlotListRelationFilter } from 'src/app/slots/graphql/dtos/where.args'
import { VerificationRelationFilter } from 'src/app/verifications/graphql/dtos/where.args'

@InputType()
export class GarageWhereUniqueInput {
  id: number
}

@InputType()
export class GarageWhereInputStrict implements RestrictProperties<GarageWhereInputStrict, Prisma.GarageWhereInput> {
  id: IntFilter
  createdAt: DateTimeFilter
  updatedAt: DateTimeFilter
  displayName: StringFilter
  description: StringFilter
  images: StringListFilter
  companyId: IntFilter
  Company: CompanyRelationFilter
  Address: AddressRelationFilter
  Verification: VerificationRelationFilter
  Reviews: ReviewListRelationFilter
  Slots: SlotListRelationFilter

  AND: GarageWhereInput[]
  OR: GarageWhereInput[]
  NOT: GarageWhereInput[]
}

@InputType()
export class GarageWhereInput extends PartialType(GarageWhereInputStrict) {}

@InputType()
export class GarageListRelationFilter {
  every?: GarageWhereInput
  some?: GarageWhereInput
  none?: GarageWhereInput
}

@InputType()
export class GarageRelationFilter {
  is?: GarageWhereInput
  isNot?: GarageWhereInput
}
