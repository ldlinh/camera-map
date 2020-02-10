import React from 'react'
import { compose, withProps, lifecycle } from 'recompose'
import {
    withScriptjs,
    withGoogleMap,
    GoogleMap,
    Marker,
    Polyline,
    DirectionsRenderer
} from 'react-google-maps'
import camera from '../Monitoring.png'
import cameraWarning from '../Monitoring-warning.png'
import markerCamera from '../iconfinder_map_marker.png'

const Map = compose(
    withProps({
        googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyDiInU8M5pi0ATUaLXFgdX95fkvkJD2nKM&v=3.exp&libraries=geometry,drawing,places",
        loadingElement: <div style={{ height: `100%` }} />,
        containerElement: <div style={{width: "100%", height: "100%", position: "absolute", top: 0, left: 0,}} />,
        mapElement: <div style={{ height: `100%` }} />
    }),
    withScriptjs,
    withGoogleMap,
    lifecycle({

        componentDidMount() {


            const google = window.google;
            const waypoints = this.props.markerList.map(p => ({
                location: {lat: p.lat, lng: p.long},
                stopover: true
            }));
            const origin = waypoints.shift().location;
            const destination = waypoints.pop().location;
            const directionsService = new google.maps.DirectionsService();
            const polylineOptionsActual = new google.maps.Polyline({
                strokeColor: 'FF0000',
                strokeOpacity: 1.0,
                strokeWeight: 10
            });
            const directionsDisplay = new google.maps.DirectionsRenderer({polylineOptions: polylineOptionsActual})
            directionsService.route(
                {
                    origin: origin,
                    destination: destination,
                    travelMode: google.maps.TravelMode.DRIVING,
                    waypoints: waypoints
                },
                (result, status) => {
                    if (status === google.maps.DirectionsStatus.OK) {
                        this.setState({
                            directions: result
                        });
                    } else {
                        this.setState({error: result});
                    }
                }
            );
        }
    })
)(({ directions, isMarkerShown, markerList, onMarkerClick }) => (
    <GoogleMap
        defaultZoom={18}
        defaultCenter={{ lat: 10.7624939, lng: 106.7020087 }}
        style={{width: "100%", height: "100%", position: "absolute", top: 0, left: 0,}} >
        {isMarkerShown && (
            markerList.map(marker => (
                <Marker
                    key={marker.id}
                    name={'MMSoftDev'}
                    position={{ lat: marker.lat, lng: marker.long }}
                    title={'MMSoft Development Room'}
                    icon={marker.status == 'active' ? {
                        url: camera
                    } : {
                        url: cameraWarning
                    }}
                    onClick={() => onMarkerClick(marker.cameraId)}
                />
            ))
        )}
        {
                directions &&
                // <Polyline
                //     path={directions}
                //     geodesic={true}
                //     options={{
                //         strokeColor: "#ff2343",
                //         strokeOpacity: 0.8,
                //         strokeWeight: 5,
                //         clickable: true
                //     }}
                // />

                <DirectionsRenderer
                    directions={directions}
                    options={{
                        polylineOptions: {
                          stokeColor: "#FF0000",
                          strokeOpacity: 1.0,
                          strokeWeight: 6
                        },
                        markerOptions: { icon: markerCamera },
                        // icon: { scale: 3 }
                      }}
                />


            }
    </GoogleMap>
))

export default Map