'use client'

import { useKeypress } from '@parkhunt/common'
import { SearchGaragesQuery } from '@parkhunt/network'
import { useState } from 'react'
import { Marker } from './map/map-marker'
import { Dialog, ParkingIcon } from '@parkhunt/ui'

const GarageMarker = ({ marker }: { marker: SearchGaragesQuery['searchGarages'][number] }) => {
  const [showPopup, setShowPopup] = useState(false)

  useKeypress(['Escape'], () => setShowPopup(false))

  if (!marker.address?.lat || !marker.address.lng) {
    return null
  }
  return (
    <>
      <Dialog title="Booking" widthClassName="max-w-3xl" open={showPopup} setOpen={setShowPopup}>
        {/* <FormProviderBookSlot defaultValues={{ endTime, startTime }}>
        <BookSlotPopup garage={marker} />
      </FormProviderBookSlot> */}
        {marker.id}
      </Dialog>

      <Marker
        latitude={marker.address.lat}
        longitude={marker.address.lng}
        onClick={(e) => {
          e.originalEvent.stopPropagation()
          setShowPopup((state) => !state)
        }}
      >
        <ParkingIcon />
      </Marker>
    </>
  )
}

export default GarageMarker
