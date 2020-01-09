import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import camera from './Monitoring.png';
import './App.css';
import ReactDOM from "react-dom";
import { compose, withProps } from "recompose";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker
} from "react-google-maps";
import Modal from './components/Modal'
// import jsmpeg from 'jsmpeg';


const App = () => {

  const [openModal, setOpenModal] = useState(false)

  const onMarkerClick = () => {
    setOpenModal(true)
    window.showCamera("ws://localhost:9999")
  };

  const resetModal = () => {
    setOpenModal(false)
  }

  const GoogleMapCompoinent = compose(
    withProps({
      googleMapURL:
        "https://maps.googleapis.com/maps/api/js?key=AIzaSyDiInU8M5pi0ATUaLXFgdX95fkvkJD2nKM&v=3.exp&libraries=geometry,drawing,places",
      loadingElement: <div style={{ height: `100%` }} />,
      containerElement: <div style={{ height: `768px` }} />,
      mapElement: <div style={{ height: `100%` }} />
    }),
    withScriptjs,
    withGoogleMap,
  )(props => (
    <GoogleMap
      defaultZoom={18}
      defaultCenter={{ lat: 10.7624939, lng: 106.7020087 }}>
      {props.isMarkerShown && (
        <Marker
          name={'MMSoftDev'}
          position={{ lat: 10.7624939, lng: 106.7020087 }}
          title={'MMSoft Development Room'}
          icon={{
            url: camera
          }}
          onClick={onMarkerClick}
        />
      )}
    </GoogleMap>

  ));

  return (
    <div className="App">
      <header></header>
      <body>
        <div>
          <GoogleMapCompoinent isMarkerShown="true"
          />

        </div>
        <div>
          <Modal openModal={openModal} resetModal={resetModal} />
        </div>
      </body>
    </div>


  );
}

export default App;
