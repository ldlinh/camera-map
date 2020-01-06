import React from 'react';
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
import jsmpeg from 'jsmpeg';
import ReactPlayer from 'react-player'

const onMarkerClick = (even) => {

  //window.open('rtsp://192.168.10.200/onvif-media/media.amp?streamprofile=Profile2&audio=0', '_blank');
  //var client = new WebSocket('rtsp://admin:admin@192.168.10.200:554/onvif-media/media.amp?streamprofile=Profile2&audio=0');
  var client = new WebSocket('ws://192.168.10.72:9998');
  var canvas = document.querySelector('canvas');
  
  canvas.width = 800;
  canvas.height = 600;
  var player = new jsmpeg(client, {
    canvas: canvas 
  });
};

const streamURL = 'rtsp://admin:admin@192.168.10.200:554/onvif-media/media.amp?streamprofile=Profile2&audio=0';

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

function App() {
  return (
    <div className="App">
        <header></header>
        <body>
        <div>
          <GoogleMapCompoinent isMarkerShown="true"
          />

        </div>
        <div>
        <ReactPlayer  url={streamURL} playing />
        <canvas>
          </canvas>
        </div>
        </body>
    </div>


  );
}

export default App;
