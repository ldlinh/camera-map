import React, {useEffect} from 'react';
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
// import jsmpeg from 'jsmpeg';

const onMarkerClick = () => {

window.showCamera("ws://localhost:9999")
  
};


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

  useEffect(() => {
    const script = document.createElement("script");

    script.src = './jsmpeg.min.js'
    script.async = true;

    document.body.appendChild(script);
    
    const script1 = document.createElement("script");
    script1.type = 'text/javascript';
    script1.text = `function showCamera(ws) {
                      var canvas = document.getElementById('videoCanvas');
                      var player = new JSMpeg.Player(ws, {canvas:canvas, autoplay:true,audio:false,loop: true });
                    }`
    document.body.appendChild(script1);

  }, [])

  return (
    <div className="App">
        <header></header>
        <body>
        <div>
          <GoogleMapCompoinent isMarkerShown="true"
          />

        </div>
        <div>
        <canvas id="videoCanvas">
          </canvas>
        </div>
        </body>
    </div>


  );
}

export default App;
