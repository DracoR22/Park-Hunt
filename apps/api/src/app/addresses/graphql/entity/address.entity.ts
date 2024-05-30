import { ObjectType } from '@nestjs/graphql'
import { Address as AddressType } from '@prisma/client'
import { RestrictProperties } from 'src/common/dtos/common.input'

@ObjectType()
export class Address implements RestrictProperties<Address, AddressType> {
  address: string
  createdAt: Date
  garageId: number
  id: number
  lat: number
  lng: number
  updatedAt: Date
  // Todo Add below to make optional fields optional.
  // @Field({ nullable: true })
}
