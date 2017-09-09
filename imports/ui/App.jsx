import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { default as FaSpinner } from "react-icons/lib/fa/spinner";

import AccountsUIWrapper from './AccountsUIWrapper.jsx';
import Map from './GoogleMap.jsx';

// App component - represents the whole app
export default class App extends Component {
  render() {
    return (
      <div className="container">
        <header>
          <h1>Tip Mob</h1>

          <AccountsUIWrapper />

        </header>

        <Map />
      </div>
    );
  }
}
