/**
 * @license
 * Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
 */

import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';

import '@polymer/iron-ajax/iron-ajax.js';

class Weather extends PolymerElement {

  static get is() { return 'weather-element'; }

  static get template() {
    return html`
      
        <iron-ajax id="weather-ajax"
          auto
          loading="{{activeRequest}}"
          url='https://api.openweathermap.org/data/2.5/weather?id=3435910&APPID=8af2aa7fa978da0c3dc608a85406875c'
          handle-as="json"
          last-response="{{weatherResponse}}">
        </iron-ajax>
 
        <template is="dom-if" if="[[weatherResponse]]">
          <div class="horizontal justified layout">
            <h3 id="location">
              Weather for
                <span>[[weatherResponse.name]] </span>
            </h3>
          </div>

          </br>
          <h3><span>Temperatura [[weatherResponse.main.temp]]</span> °F</h3>
          <h3><span>Presion [[weatherResponse.main.pressure]]</span> hPa</h3>
          <h3><span>Humedad [[weatherResponse.main.humidity]]</span> %</h3>
          <h3><span>Cielo [[weatherResponse.weather.0.main]] : [[weatherResponse.weather.0.description]]</span></h3>

        </template>

    `;
  }
}

window.customElements.define('weather-element', Weather);
