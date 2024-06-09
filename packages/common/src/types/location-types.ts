export type LocationInfo = { placeName: string; latLng: [number, number] }

export type LatLng = {
  lat: number
  lng: number
}

export type LngLatTuple = [number, number]

export type ViewState = {
  latitude: number
  longitude: number
  zoom?: number
}
