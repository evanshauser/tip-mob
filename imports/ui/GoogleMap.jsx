import {default as React, Component,} from 'react';
import withScriptjs from "react-google-maps/lib/async/withScriptjs";
import { withGoogleMap, GoogleMap, Marker } from "react-google-maps";

const markers = [];

// Wrap all `react-google-maps` components with `withGoogleMap` HOC
// and name it GettingStartedGoogleMap
const CustomGoogleMap = withGoogleMap(props => (
  <GoogleMap
    ref={props.onMapLoad}
    defaultZoom={20}
    defaultCenter={{ lat: 40.4419322, lng: -79.9418666 }}
    onClick={props.onMapClick}
  >
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
    }
    this.handleMapClick = this.handleMapClick.bind(this)
    this.handleMapLoad = this.handleMapLoad.bind(this)
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
        markers={this.state.markers}
        onMarkerRightClick={_.noop}
      />
    );
  }
}
