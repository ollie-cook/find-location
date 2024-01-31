'use client'

import { useState, useCallback } from 'react';
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '100%'
};

const center = {
  lat: 	51.5072,
  lng: -0.1275
};

export default function MapWrapper(props) {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
  })

  const [map, setMap] = useState(null)

  const onLoad = useCallback(function callback(map) {
    // This is just an example of getting and using the map instance!!! don't just blindly copy!
    //const bounds = new window.google.maps.LatLngBounds(center);
    //map.fitBounds(bounds);

    setMap(map)

    const marker = new google.maps.Marker({
      position: props.goal,
      map,
      title: "Click to zoom",
    });
    marker.addListener("click", () => {
      props.setFound(true)
    });

    setMap(map)
  }, [])

  const onUnmount = useCallback(function callback(map) {
    setMap(null)
  }, [])

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={props.center}
      zoom={17}
      onLoad={onLoad}
      onUnmount={onUnmount}
      options={{ zoomControl: false, minZoom: 17, maxZoom: 17, mapTypeControl: false, streetViewControl: false, fullscreenControl: false }}
    >
      { /* Child components, such as markers, info windows, etc. */ }
      <></>
    </GoogleMap>
) : <></>
}