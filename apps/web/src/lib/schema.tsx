import {
  FormTypeSearchGarage,
  formDefaultValuesSearchGarages,
  formSchemaSearchGarage,
  getCurrentTimeAndOneHourLater,
} from '@parkhunt/forms'
import { DefaultValues, FormProvider, useForm } from 'react-hook-form'
import { ReactNode } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'

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
