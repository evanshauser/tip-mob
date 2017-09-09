import {default as React, Component,} from 'react';
import withScriptjs from "react-google-maps/lib/async/withScriptjs";
import { withGoogleMap, GoogleMap, Marker, OverlayView, InfoWindow } from "react-google-maps";

const markers = [];

const STYLES = {
  mapContainer: {
    height: `100%`,
  },
  overlayView: {
    background: `white`,
    border: `1px solid #ccc`,
    padding: 15,
  },
};

function getPixelPositionOffset(width, height) {
  return { x: -(width / 2), y: -(height / 2) };
}

// Wrap all `react-google-maps` components with `withGoogleMap` HOC
// and name it GettingStartedGoogleMap
const CustomGoogleMap = withGoogleMap(props => (
  <GoogleMap
    ref={props.onMapLoad}
    defaultZoom={10}
    defaultCenter={{ lat: 40.4419322, lng: -79.9418666 }}

    onClick={props.onMapClick}
    onRightClick={props.onRightClick}
  >
    {(props.overlayPosition != null) ? 
      <OverlayView
        position={props.overlayPosition}
        mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
        getPixelPositionOffset={getPixelPositionOffset}
      >
          <div style={STYLES.overlayView}>
            <h1>OverlayView </h1>
            <button onClick={_.noop}>
              Event
            </button>
            <button onClick={_.noop}>
              Tip
            </button>
            <button onClick={_.noop}>
              Directions?
            </button>
          </div>
      </OverlayView>
      : ''}
    {props.markers.map((marker, index) => (
      <Marker
        {...marker}
        onRightClick={() => props.onMarkerRightClick(index)}
      />
    ))}
  </GoogleMap>
));

export default class GettingStartedExample extends Component {
  constructor() {
    super()
    this.state = {
      markers: [{
        position: {
          lat: 40.4419322,
          lng: -79.9418666,
        },
        key: 'Maggie Mo',
        defaultAnimation: 2,
      }],

      overlayPosition: null
    };
    this.handleMapClick = this.handleMapClick.bind(this)
    this.handleMapLoad = this.handleMapLoad.bind(this)
    this.handleRightClick = this.handleRightClick.bind(this)

  }


  handleMapClick(event) {
    const nextMarkers = [
      ...this.state.markers,
      {
        position: event.latLng,
        defaultAnimation: 2,
        key: Date.now(),
      } ,
    ];
    this.setState({
      markers: nextMarkers,
    });
  }

  handleMapLoad(map) {
    this._mapComponent = map;
    if (map) {
      console.log(map.getZoom());
    }
  }

  handleRightClick(event) {
    if (this.overlayPosition != null) {
      this.setState({
        overlayPosition: null
      });
    } else {
      this.setState({
        overlayPosition: event.latLng,
      });
    }
  }



  render() {
    return (
      <CustomGoogleMap
        containerElement={
          <div style={{ height: `80vh` }} />
        }
        mapElement={
          <div style={{ height: `100%` }} />
        }
        onMapLoad={this.handleMapLoad}
        onMapClick={this.handleMapClick}
        onRightClick={this.handleRightClick}
        markers={this.state.markers}
        onMarkerRightClick={_.noop}
        overlayPosition={this.state.overlayPosition}
      />
    );
  }
}


