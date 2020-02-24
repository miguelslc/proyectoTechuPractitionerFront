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
import '../node_modules/brum-global-variable/brum-global-variable.js';
import '@polymer/iron-localstorage/iron-localstorage.js';
import '@polymer/iron-ajax/iron-ajax.js';
import '@vaadin/vaadin-grid/vaadin-grid';
import './shared-styles.js';

class Usuario extends PolymerElement {
  static get properties() {
    return {
      storedUser: Object
    };
  }

  static get template() {
    return html`
      <style include="shared-styles">
        :host {
          display: block;

          padding: 10px;
        }
      </style>
      
      <iron-localstorage 
        name="user-storage" 
        value="{{storedUser}}" 
        on-iron-localstorage-load="initStoredUser">
      </iron-localstorage>
    
      <brum-global-variable 
        key="userData" 
        value="{{storedUser}}">
      </brum-global-variable>
    
      <div hidden$="[[!storedUser.loggedin]]">
        <div class="card">
          <h1>Cuentas</h1>
          <p>Bienvenido, [[storedUser.name]]! Has accedido al listado de Cuentas:</p>
          </ br>

          <dom-bind>
            <template is="dom-bind">
              
              <iron-ajax 
                auto 
                url="http://localhost:3000/api/account" 
                handle-as="json" 
                last-response="{{accounts}}">
              </iron-ajax>

              <vaadin-grid aria-label="Basic Binding Example" items="[[accounts.accounts]]">

                <vaadin-grid-column width="50px" flex-grow="0">
                  <template class="header">#</template>
                  <template>[[index]]</template>
                  <!-- If necessary, the footer could be set using <template class="footer"> -->
                  <template class="footer">#</template>
                </vaadin-grid-column>

                <vaadin-grid-column>
                  <template class="header">Number</template>
                  <template>[[item.number]]</template>
                  <template class="footer">Number</template>
                </vaadin-grid-column>

                <vaadin-grid-column>
                  <template class="header">Amount</template>
                  <template>[[item.amount]]</template>
                  <template class="footer">Amount</template>
                </vaadin-grid-column>

                <vaadin-grid-column>
                  <template class="header">Currency</template>
                  <template>[[item.currency]]</template>
                  <template class="footer">Currency</template>
                </vaadin-grid-column>

                <vaadin-grid-column>
                  <template class="header">Type</template>
                  <template>[[item.type]]</template>
                  <template class="footer">Type</template>
                </vaadin-grid-column>

              </vaadin-grid>
            </template>
          </dom-bind>
        </div>
      </div>
    `;
  }
}

window.customElements.define('alta-usuario', Usuario);