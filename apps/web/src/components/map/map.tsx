import React from 'react'
import MapGl, { Map as MapProps, useMap } from 'react-map-gl'

// @ts-ignore
type MapProps = React.ComponentProps<typeof MapGl> & { height?: string }

export const Map = ({ height = '100vh', ...props }: MapProps) => {
  return (
    // @ts-ignore
    <MapGl
      {...props}
      projection={{ name: 'globe' }}
      mapStyle="mapbox://styles/iamkarthick/clebahxqe001701mo1i1adtw3"
      // @ts-ignore
      mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
      style={{ height }}
      scrollZoom={false}
    >
      <StyleMap />
      {/* @ts-ignore */}
      {props.children}
    </MapGl>
  )
}

export const StyleMap = () => {
  const { current } = useMap()

  current?.on('style.load', () => {
    current?.getMap().setFog({
      color: 'rgb(255, 255, 255)', // Lower atmosphere
      range: [1, 10],
      //   @ts-ignore
      'high-color': 'rgb(200, 200, 200)', // Upper atmosphere
      'horizon-blend': 0.05, // Atmosphere thickness (default 0.2 at low zooms)
      'space-color': 'rgb(150, 150, 150)', // Background color
      'star-intensity': 0.5, // Background star brightness (default 0.35 at low zoooms )
    })
  })
  return null
}
