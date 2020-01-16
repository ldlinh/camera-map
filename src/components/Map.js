import React from 'react'
import { compose, withProps } from 'recompose'
import {
    withScriptjs,
    withGoogleMap,
    GoogleMap,
    Marker
} from 'react-google-maps'
import camera from '../Monitoring.png'

const Map = compose(
    withProps({
        googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyDiInU8M5pi0ATUaLXFgdX95fkvkJD2nKM&v=3.exp&libraries=geometry,drawing,places",
        loadingElement: <div style={{ height: `100%` }} />,
        containerElement: <div style={{ height: `768px` }} />,
        mapElement: <div style={{ height: `100%` }} />
    }),
    withScriptjs,
    withGoogleMap,
)(({ isMarkerShown, markerList, onMarkerClick }) => (
    <GoogleMap
        defaultZoom={18}
        defaultCenter={{ lat: 10.7624939, lng: 106.7020087 }}>
        {isMarkerShown && (
            markerList.map(marker => (
                <Marker
                    key={marker.id}
                    name={'MMSoftDev'}
                    position={{ lat: marker.lat, lng: marker.lng }}
                    title={'MMSoft Development Room'}
                    icon={{
                        url: camera
                    }}
                    onClick={() => onMarkerClick(marker.id)}
                />
            ))
        )}
    </GoogleMap>
))

export default Map