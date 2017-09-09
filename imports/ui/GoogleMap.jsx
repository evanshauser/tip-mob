import {default as React, Component, PropTypes } from 'react';
import withScriptjs from "react-google-maps/lib/async/withScriptjs";
import { withGoogleMap, GoogleMap, Marker, InfoWindow } from "react-google-maps";
import { createContainer } from 'meteor/react-meteor-data';
import { Markers } from '../api/tasks.js';

// Wrap all `react-google-maps` components with `withGoogleMap` HOC
// and name it GettingStartedGoogleMap
const CustomGoogleMap = withGoogleMap(props => {
  const handleSubmit = event => {
    event.preventDefault();

    // props.handleNewDescription();

    // // Find the text field via the React ref
    // const text = ReactDOM.findDOMNode(this.refs.textInput).value.trim();

    // Meteor.call('tasks.insert', text);

    // // Clear form
    // ReactDOM.findDOMNode(this.refs.textInput).value = '';
  };

  return (
    <GoogleMap
      ref={props.onMapLoad}
      defaultZoom={20}
      defaultCenter={{ lat: 40.4419322, lng: -79.9418666 }}
      onClick={props.onMapClick}
    >
      {props.markers.map((marker, index) => (
        <Marker
          {...marker}
          key={index}
          onRightClick={() => props.onMarkerRightClick(marker._id)}
        >
          {(
            <InfoWindow onCloseClick={() => {}}>
              <div>
                <form className="new-description" onSubmit={handleSubmit} >
                  <input
                    type="text"
                    // ref="textInput"
                    placeholder="Type to add new description"
                  />
                  <br />
                </form>
              </div>
            </InfoWindow>
          )}
        </Marker>
      ))}
    </GoogleMap>
  );
});

export class InteractiveMap extends Component {
  constructor(props) {
    super(props);
    this.handleMapClick = this.handleMapClick.bind(this);
    this.handleMarkerRightClick = this.handleMarkerRightClick.bind(this);
    this.handleMapLoad = this.handleMapLoad.bind(this);
  }

  handleMapClick(event) {
    Meteor.call('markers.insert', {
      position: {
        lat: event.latLng.lat(),
        lng: event.latLng.lng(),
      },
      defaultAnimation: 2,
      key: Date.now(),
    });
  }

  handleMarkerRightClick(markerId) {
    Meteor.call('markers.remove', markerId);
  }

  handleMapLoad(map) {
    this._mapComponent = map;
    if (map) {
      // console.log(map.getZoom());
    }
  }

  handleNewDescription(markerId, ) {
    Meteor.call('markers.remove', markerId);
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
        markers={this.props.markers}
        onMarkerRightClick={this.handleMarkerRightClick}

      />
    );
  }
}

InteractiveMap.propTypes = {
  markers: PropTypes.array.isRequired,
  currentUser: PropTypes.object,
};

export default createContainer(() => {
  Meteor.subscribe('markers');

  return {
    currentUser: Meteor.user(),
    markers: Markers.find({}).fetch(),
  };
}, InteractiveMap );
