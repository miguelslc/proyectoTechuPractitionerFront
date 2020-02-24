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

import '@polymer/paper-button/paper-button.js';
import '../node_modules/brum-global-variable/brum-global-variable.js'
import '@polymer/polymer/lib/elements/dom-if.js';
import '@polymer/app-route/app-location.js'
import './shared-styles.js';

class LogOut extends PolymerElement {
  
  static get is() {
    return 'log-out';
  }

  static get properties(){
      return {
          storedUser: Object,
          link: {
              type: Boolean,
              value: false
          }
      }
  }
  static get template() {
    return html`
      <style include="shared-styles">
        :host {
            margin: 0;
            padding: 0;
        }

        paper-button {
            color: #fff;
        }
        paper-button.link {
            color: #fff;
            display: inline-block;
            font-size: 13px;
        }
        paper-button.indigo {
            background-color: var(--paper-indigo-500);
            color: white;
            --paper-button-raised-keyboard-focus: {
              background-color: var(--paper-pink-a200) !important;
              color: white !important;
            };
        }
        paper-button.indigo:hover {
            background-color: var(--paper-indigo-400);
        }
      </style>

      <brum-global-variable key="userData" value="{{storedUser}}"></brum-global-variable>

      <template is="dom-if" if="{{!link}}">
        <paper-button raised class="indigo" on-tap="logout">Log Out [[[storedUser.name]]]</paper-button>
      </template>

      <template is="dom-if" if="{{link}}">
        <paper-button class="link" on-tap="logout">Log Out [[[storedUser.name]]]</paper-button>
      </template>
    `;
  }

  logout(){
      this.storedUser = null;
      // redirect to movimentos
      this.set('route.path', '/index-home');
  }
  
}

window.customElements.define('log-out', LogOut);
