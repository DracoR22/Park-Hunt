import { useLazyQuery } from '@apollo/client'
import { SearchGaragesDocument } from '@parkhunt/network'
import { useEffect } from 'react'
import GarageMarker from './garage-marker'
import { useFormContext } from 'react-hook-form'
import { useConvertSearchFormToVariables } from '@parkhunt/forms'
import { Panel } from './map/panel'
import { IconInfoCircle, IconLoader } from '@tabler/icons-react'

const ShowGarages = () => {
  const { variables, debouncing } = useConvertSearchFormToVariables()

  const [searchGarages, { loading: garagesLoading, data, previousData, error }] = useLazyQuery(SearchGaragesDocument)

  useEffect(() => {
    if (variables) {
      searchGarages({ variables })
    }
  }, [variables])

  const garages = data?.searchGarages || previousData?.searchGarages || []
  const loading = debouncing || garagesLoading

  if (error) {
    return (
      <Panel position="center-center" className="bg-white/50 shadow border-white border backdrop-blur-sm">
        <div className="flex items-center justify-center gap-2 ">
          <IconInfoCircle /> <div>{error.message}</div>
        </div>
      </Panel>
    )
  }
  if (!loading && garages.length === 0) {
    return (
      <Panel position="center-center" className="bg-white/50 shadow border-white border backdrop-blur-sm">
        <div className="flex items-center justify-center gap-2 ">
          <IconInfoCircle /> <div>No parking slots found in this area.</div>
        </div>
      </Panel>
    )
  }

  return (
    <>
      {loading ? (
        <Panel position="center-bottom">
          <IconLoader />
        </Panel>
      ) : null}
      {garages.map((garage) => (
        <GarageMarker key={garage.id} marker={garage} />
      ))}
    </>
  )
}
export default ShowGarages
