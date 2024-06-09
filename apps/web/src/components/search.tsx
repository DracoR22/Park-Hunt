'use client'

import { useCallback } from 'react'
import { ViewStateChangeEvent } from 'react-map-gl'
import { initialViewState } from '@parkhunt/common'
import { FormTypeSearchGarage } from '@parkhunt/forms'
import { useFormContext } from 'react-hook-form'
import { Map } from './map/map'
import { Panel } from './map/panel'
import { Autocomplete } from './map/auto-complete'
import { DefaultZoomControls } from './map/zoom-controls'
import { SearchPlaceBox } from './map/search-places-box'

export const SearchPage = () => {
  const {
    register,
    setValue,
    watch,
    formState: { errors },
    trigger,
  } = useFormContext<FormTypeSearchGarage>()
  console.log('errors ', errors)
  const formData = watch()

  const handleMapChange = useCallback((target: ViewStateChangeEvent['target']) => {
    const bounds = target.getBounds()
    const locationFilter = {
      ne_lat: bounds?.getNorthEast().lat || 0,
      ne_lng: bounds?.getNorthEast().lng || 0,
      sw_lat: bounds?.getSouthWest().lat || 0,
      sw_lng: bounds?.getSouthWest().lng || 0,
    }
    setValue('locationFilter', locationFilter)
  }, [])

  return (
    <Map
      onLoad={(e) => handleMapChange(e.target)}
      onDragEnd={(e) => handleMapChange(e.target)}
      onZoomEnd={(e) => handleMapChange(e.target)}
      initialViewState={initialViewState}
    >
      <Panel position="left-top" className="mt-[100px]">
        <SearchPlaceBox />
      </Panel>
      <Panel position="right-center">
        <DefaultZoomControls />
      </Panel>
    </Map>
  )
}
