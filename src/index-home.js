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
import './weather-element';
import './quotes-element';
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
        <h1>Inicio</h1>
        
        <!--Traemos una frase mediante una Api -->
        <quotes-element></quotes-element>
        </br>
        <!--Traemos el clima de un elemento custom -->
        <weather-element></weather-element>
        
    </div>
    `;
  }
}

window.customElements.define('index-home', Index);
