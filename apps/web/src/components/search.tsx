'use client'

import { useCallback } from 'react'
import { ViewStateChangeEvent } from 'react-map-gl'
import { initialViewState, toLocalISOString } from '@parkhunt/common'
import { FormTypeSearchGarage } from '@parkhunt/forms'
import { useFormContext } from 'react-hook-form'
import { Map } from './map/map'
import { Panel } from './map/panel'
import { Autocomplete } from './map/auto-complete'
import { DefaultZoomControls } from './map/zoom-controls'
import { SearchPlaceBox } from './map/search-places-box'
import { IconArrowDown } from '@tabler/icons-react'
import { IconType, Input } from '@parkhunt/ui'
import ShowGarages from './show-garages'

export const SearchPage = () => {
  const {
    register,
    setValue,
    watch,
    formState: { errors },
    trigger,
  } = useFormContext<FormTypeSearchGarage>()

  const formData = watch()

  const handleMapChange = useCallback(
    (target: ViewStateChangeEvent['target']) => {
      const bounds = target.getBounds()
      const locationFilter = {
        ne_lat: bounds?.getNorthEast().lat || 0,
        ne_lng: bounds?.getNorthEast().lng || 0,
        sw_lat: bounds?.getSouthWest().lat || 0,
        sw_lng: bounds?.getSouthWest().lng || 0,
      }
      setValue('locationFilter', locationFilter)
    },
    [setValue],
  )

  return (
    <Map
      onLoad={(e) => handleMapChange(e.target)}
      onDragEnd={(e) => handleMapChange(e.target)}
      onZoomEnd={(e) => handleMapChange(e.target)}
      initialViewState={initialViewState}
    >
      <ShowGarages />
      <Panel position="left-top" className="mt-[100px]">
        <SearchPlaceBox />
        <div className="flex relative pl-1 flex-col mt-1 bg-white/40 items-center gap-1 backdrop-blur-sm">
          <div className=" absolute left-[1px] top-1/2 -translate-y-1/2 ">
            <IconArrowDown className="p-1" />
          </div>
          <div className="flex gap-1 items-center">
            <IconType time={formData.startTime} />
            <Input
              type="datetime-local"
              className="w-full p-2 text-lg font-light border-0"
              min={toLocalISOString(new Date()).slice(0, 16)}
              {...register('startTime', {
                onChange(event) {
                  trigger('startTime')
                  trigger('endTime')
                },
              })}
            />
          </div>
          <div className="flex gap-1 items-center">
            <IconType time={formData.endTime} />
            <Input
              min={toLocalISOString(new Date()).slice(0, 16)}
              type="datetime-local"
              className="w-full p-2 text-lg font-light border-0"
              {...register('endTime', {
                onChange(event) {
                  trigger('endTime')
                },
              })}
            />
          </div>
        </div>
      </Panel>

      <Panel position="right-center">
        <DefaultZoomControls />
      </Panel>
    </Map>
  )
}
