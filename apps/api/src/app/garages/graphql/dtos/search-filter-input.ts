import { Field, InputType, ObjectType, PickType } from '@nestjs/graphql'
import { FindManyGarageArgs } from './find.args'
import { Slot } from 'src/app/slots/graphql/entity/slot.entity'

@InputType()
export class DateFilterInput {
  @Field()
  start: string
  @Field()
  end: string
}

@InputType()
export class GarageFilter extends PickType(FindManyGarageArgs, ['where', 'orderBy', 'skip', 'take'], InputType) {}

@ObjectType()
export class MinimalSlotGroupBy extends PickType(Slot, ['type', 'pricePerHour']) {
  count: number
}
