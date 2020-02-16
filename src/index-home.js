/**
 * @license
 * Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
 */

import { PolymerElement, html } from '@polymer/polymer/polymer-element';
import './shared-styles.js';

import '@polymer/iron-icon/iron-icon';
import '@polymer/iron-icons/image-icons';
import '@polymer/iron-icons/iron-icons';
import '@polymer/iron-icons/maps-icons'
import '@polymer/paper-icon-button/paper-icon-button';
import '@polymer/paper-progress/paper-progress';
import '@polymer/paper-styles/classes/global';
import '@polymer/paper-styles/classes/shadow';
import '@polymer/iron-ajax/iron-ajax';

class Index extends PolymerElement {
  static get template() {
    return html`
      <style include="shared-styles">
        :host {
          display: block;

          padding: 10px;
        }
      </style>

      <div class="card">
        <div class="circle">1</div>
        <h1>View One</h1>
        <p>Ut labores minimum atomorum pro. Laudem tibique ut has.</p>
        <p>Lorem ipsum dolor sit amet, per in nusquam nominavi periculis, sit elit oportere ea.Lorem ipsum dolor sit amet, per in nusquam nominavi periculis, sit elit oportere ea.Cu mei vide viris gloriatur, at populo eripuit sit.</p>
      
      <template is="dom-if" if="[[coordinates]]">
        <iron-ajax id="weather-ajax"
          auto
          loading="{{activeRequest}}"
          url='https://weather-ydn-yql.media.yahoo.com/forecastrss?lat=-34.6131500&lon=-58.3772300'
          handle-as="json"
          last-response="{{weatherResponse}}">
        </iron-ajax>
      </template>

      <paper-progress id="request-progress"
        indeterminate
        hidden$="[[!activeRequest]]">
      </paper-progress>

        <template is="dom-if" if="[[weatherResponse]]">
          <div class="horizontal justified layout">
            <h3 id="location">
              Weather for
                <span>[[_calculateLocationString(weatherResponse.query.results.channel.location)]]</span>
            </h3>
            <paper-icon-button icon="maps:my-location"
                  alt="Detect current location"
                  disabled$="[[disableLocationButton]]"
                  on-click="_getCurrentPosition">
            </paper-icon-button>
          </div>

          <iron-icon id="weather-icon"
            icon="[[_calculateWeatherIcon(weatherResponse.query.results.channel.item.condition.code)]]">
          </iron-icon>

          <h2>
            <span>[[weatherResponse.query.results.channel.item.condition.temp]]</span>°
            <span>[[weatherResponse.query.results.channel.units.temperature]]</span>,
            <span>[[weatherResponse.query.results.channel.item.condition.text]]</span>
          </h2>
          <div class="horizontal justified layout">
          <h5 id="update-time">
            As of <span>[[weatherResponse.query.results.channel.item.condition.date]]</span>
          </h5>
          <paper-icon-button icon="refresh"
                alt="Refresh current weather"
                disabled$="[[activeRequest]]"
                on-click="_requestWeatherData">
          </paper-icon-button>
        </div>
        <a href="https://www.yahoo.com/?ilc=401" target="_blank">
          <img src="https://poweredby.yahoo.com/purple.png">
        </a>
      </template>

    </div>
    `;
  }

  _getCurrentPosition () {
    disableLocationButton = true;
    navigator.geolocation.getCurrentPosition(function(position) {
      coordinates = position.coords;
      disableLocationButton = false;
    }, function(error) {
      coordinates = defaultCoordinates;
    });
  };

  // See https://developer.yahoo.com/weather/
  _calculateWeatherParams (latitude, longitude) {
    var latLongString = '(' + latitude + ',' + longitude + ')';
    return {
      format: 'json',
      q: 'select * from weather.forecast where woeid in ' +
         '(SELECT woeid FROM geo.places(1) WHERE text="' + latLongString + '")'
    };
  };

  // See https://developer.yahoo.com/weather/documentation.html#codes for a list of codes.
  // There are a few mismatches, limited by the set of weather-related Material Design icons.
  _calculateWeatherIcon (code) {
    if (code <= 12 || code >= 37) {
      return 'image:flash-on';
    }

    if (code <= 18) {
      return 'image:flare';
    }

    if (code <= 30) {
      return 'image:wb-cloudy';
    }

    return 'image:wb-sunny';
  };

  _calculateLocationString (location) {
    if (location.city && location.region) {
      return location.city + ', ' + location.region;
    }

    return location.city || 'Unknown';
  };

}

window.customElements.define('index-home', Index);
