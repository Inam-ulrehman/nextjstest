import React from 'react'
import { GoogleMap, LoadScriptNext, MarkerF } from '@react-google-maps/api'
import styled from 'styled-components'
import { useSelector } from 'react-redux'

const GoogleMapComponent = () => {
  const { headerHeight } = useSelector((state) => state.websitecontent)
  const containerStyle = {
    width: `100vw`,
    height: `calc(100vh - ${headerHeight}px)`,
  }

  const center = {
    lat: 43.445077,
    lng: -80.4881016,
  }
  return (
    <LoadScriptNext
      googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}
    >
      <Wrapper>
        <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={15}>
          {/* Child components, such as markers, info windows, etc. */}
          <MarkerF position={center}></MarkerF>
        </GoogleMap>
      </Wrapper>
    </LoadScriptNext>
  )
}

const Wrapper = styled.div`
  overflow: hidden;
`
export default GoogleMapComponent
