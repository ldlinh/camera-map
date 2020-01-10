import React, {useEffect, useState} from 'react';
import camera from './Monitoring.png';
import './App.css';
import {compose, withProps, lifecycle} from "recompose";
import {
    withScriptjs,
    withGoogleMap,
    GoogleMap,
    Marker,
    DirectionsRenderer
} from "react-google-maps";
import Modal from './components/Modal'

const App = () => {

    let [markerList, setMakertList] = useState([
        {lat: 10.7624939, lng: 106.7020087},
        {lat: 10.730930, lng: 106.678224},
        {lat: 10.754230, lng: 106.678125},
        {lat: 10.773106, lng: 106.637726}
    ]);
    const [openModal, setOpenModal] = useState(false);

    const onMarkerClick = () => {
        setOpenModal(true);
        window.showCamera("ws://localhost:9999")
    };

    const resetModal = () => {
        setOpenModal(false)
    };


    useEffect(() => {
    }, [])

    const GoogleMapCompoinent = compose(
        withProps({
            googleMapURL:
                "https://maps.googleapis.com/maps/api/js?key=AIzaSyDiInU8M5pi0ATUaLXFgdX95fkvkJD2nKM&v=3.exp&libraries=geometry,drawing,places",
            loadingElement: <div style={{height: `100%`}}/>,
            containerElement: <div style={{height: `768px`}}/>,
            mapElement: <div style={{height: `100%`}}/>
        }),
        withScriptjs,
        withGoogleMap,
        lifecycle({

            componentDidMount() {
                const google = window.google;
                const waypoints = markerList.map(p => ({
                    location: {lat: p.lat, lng: p.lng},
                    stopover: true
                }));
                const origin = waypoints.shift().location;
                const destination = waypoints.pop().location;
                const directionsService = new google.maps.DirectionsService();
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
    )(props => (
        <GoogleMap
            defaultZoom={18}
            defaultCenter={{lat: 10.7624939, lng: 106.7020087}}>
            {props.isMarkerShown && (
                props.markerList.map(marker =>
                    <Marker
                        name={'MMSoftDev'}
                        position={{lat: marker.lat, lng: marker.lng}}
                        title={'MMSoft Development Room'}
                        icon={{url: camera}}
                        onClick={props.openDialog}
                    />
                )
            )}
            {
                props.directions &&
                <DirectionsRenderer
                    directions={props.directions}
                />
            }
        </GoogleMap>
    ));

    return (
        <div className="App">
            <div>
                <GoogleMapCompoinent
                    isMarkerShown="true"
                    markerList={markerList}
                    openDialog={onMarkerClick}
                />
            </div>
            <div>
                <Modal openModal={openModal} resetModal={resetModal}/>
            </div>
        </div>

    );
};

export default App;
