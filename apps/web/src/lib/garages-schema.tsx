import { SearchGaragesQueryVariables, SlotType } from '@parkhunt/network'
import z from 'zod'
import { toLocalISOString, useDebounce } from '@parkhunt/common'
import {
  DefaultValues,
  FieldNamesMarkedBoolean,
  FormProvider,
  useForm,
  useFormContext,
  useWatch,
} from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { ReactNode, useEffect, useState } from 'react'
import { isEndTimeValid, isStartTimeValid } from '@parkhunt/forms'

const minMaxTuple = z.tuple([z.number(), z.number()])

export const formSchemaSearchGarage = z
  .object({
    startTime: z.string(),
    endTime: z.string(),

    locationFilter: z.object({
      ne_lat: z.number(),
      ne_lng: z.number(),
      sw_lat: z.number(),
      sw_lng: z.number(),
    }),

    types: z.nativeEnum(SlotType).array(),

    pricePerHour: minMaxTuple.optional(),
    height: minMaxTuple.optional(),
    width: minMaxTuple.optional(),
    length: minMaxTuple.optional(),

    skip: z.number().optional(),
    take: z.number().optional(),
  })
  .refine(({ startTime }) => isStartTimeValid(startTime), {
    message: 'Start time should be greater than current time',
    path: ['startTime'],
  })
  .refine(({ endTime, startTime }) => isEndTimeValid({ endTime, startTime }), {
    message: 'End time should be greater than start time',
    path: ['endTime'],
  })

export type FormTypeSearchGarage = z.infer<typeof formSchemaSearchGarage>

export const getCurrentTimeAndOneHourLater = () => {
  const startTime = new Date()
  startTime.setMinutes(startTime.getMinutes() + 5)

  const endTime = new Date(startTime)
  endTime.setHours(endTime.getHours() + 1)

  return {
    startTime: toLocalISOString(startTime).slice(0, 16),
    endTime: toLocalISOString(endTime).slice(0, 16),
  }
}

export const AllSlotTypes = [SlotType.Bicycle, SlotType.Bike, SlotType.Car, SlotType.Heavy]

export const formDefaultValuesSearchGarages: DefaultValues<FormTypeSearchGarage> = {
  pricePerHour: [0, 200],
  width: [0, 20],
  height: [0, 100],
  length: [0, 100],
  types: AllSlotTypes.sort(),
}

export const FormProviderSearchGarage = ({ children }: { children: ReactNode }) => {
  const { startTime, endTime } = getCurrentTimeAndOneHourLater()
  const methods = useForm<FormTypeSearchGarage>({
    resolver: zodResolver(formSchemaSearchGarage),
    defaultValues: {
      ...formDefaultValuesSearchGarages,
      startTime,
      endTime,
    },
  })

  return <FormProvider {...methods}>{children}</FormProvider>
}

type FormData = Partial<
  Pick<
    FormTypeSearchGarage,
    | 'endTime'
    | 'startTime'
    | 'height'
    | 'length'
    | 'width'
    | 'pricePerHour'
    | 'types'
    | 'locationFilter'
    | 'skip'
    | 'take'
  >
>

export const useConvertSearchFormToVariables = () => {
  const [variables, setVariables] = useState<SearchGaragesQueryVariables | null>(null)

  const {
    formState: { dirtyFields, errors },
  } = useFormContext<FormTypeSearchGarage>()

  const formData = useWatch<FormTypeSearchGarage>()

  const [debouncedFormData, { debouncing }] = useDebounce(formData, 300)

  const hasErrors = Object.keys(errors).length !== 0

  useEffect(() => {
    const {
      endTime = '',
      startTime = '',
      locationFilter,
      length,
      width,
      height,
      pricePerHour,
      types,
      skip,
      take,
    } = debouncedFormData

    if (!startTime || !endTime || !locationFilter) {
      return
    }

    const dateFilter: SearchGaragesQueryVariables['dateFilter'] = {
      start: startTime,
      end: endTime,
    }

    const { ne_lat = 0, ne_lng = 0, sw_lat = 0, sw_lng = 0 } = locationFilter

    const slotsFilter = createSlotsFilter(dirtyFields, {
      length,
      width,
      height,
      pricePerHour,
      types,
    })

    const garagesFilter = createGaragesFilter(dirtyFields, { skip, take })

    setVariables({
      dateFilter,
      locationFilter: { ne_lat, ne_lng, sw_lat, sw_lng },
      ...(Object.keys(slotsFilter).length && { slotsFilter }),
      ...(Object.keys(garagesFilter).length && { garagesFilter }),
    })
  }, [debouncedFormData])

  return { variables: hasErrors ? null : variables, debouncing }
}

export const createSlotsFilter = (dirtyFields: FieldNamesMarkedBoolean<FormTypeSearchGarage>, formData: FormData) => {
  const length = dirtyFields.length && intFilter(formData.length)
  const width = dirtyFields.width && intFilter(formData.width)
  const height = dirtyFields.height && intFilter(formData.height)
  const pricePerHour = dirtyFields.pricePerHour && intFilter(formData.pricePerHour)
  const type = dirtyFields.types && { in: formData.types }

  return {
    ...(length && { length }),
    ...(width && { width }),
    ...(height && { height }),
    ...(pricePerHour && { pricePerHour }),
    ...(type && { type }),
  }
}

export const createGaragesFilter = (dirtyFields: FieldNamesMarkedBoolean<FormTypeSearchGarage>, formData: FormData) => {
  const skip = (dirtyFields.skip && formData.skip) || 0
  const take = (dirtyFields.take && formData.take) || 10

  return {
    ...(skip && { skip }),
    ...(take && { take }),
  }
}

export const intFilter = (data?: [number, number]) => {
  if (!data) return {}
  const filterObj: { gte?: number; lte?: number } = {}
  if (data[0] !== 0) filterObj['gte'] = data[0]
  if (data[1] !== 0) filterObj['lte'] = data[1]
  return filterObj
}
