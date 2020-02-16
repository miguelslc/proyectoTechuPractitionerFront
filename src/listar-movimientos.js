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
import '@polymer/iron-localstorage/iron-localstorage.js';
import '@polymer/iron-input/iron-input.js';
import '@polymer/paper-input/paper-input';
import '@polymer/paper-button/paper-button.js';
import '@vaadin/vaadin-grid/vaadin-grid';
import '../node_modules/brum-global-variable/brum-global-variable.js'
import './shared-styles.js';

class Listar extends PolymerElement {

  static get is() { return 'listar-movimientos'; }

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
        value=""
        on-iron-localstorage-load="initStoredUser">
      </iron-localstorage>

      <brum-global-variable key="userData" value=""></brum-global-variable>

      <div class="card">
      
        <div hidden$="[[!storedUser.loggedin]]">
          <p>Bienvenido, [[storedUser.name]]! Has accedido al listado de movimientos:</p>

          <dom-bind>
            <template is="dom-bind">
              <!-- Fetch an array of users to be shown in the grid -->
              <!--<iron-ajax auto url="https://demo.vaadin.com/demo-data/1.0/people?count=200" handle-as="json" last-response="{{users}}"></iron-ajax>-->
              <iron-ajax 
                auto 
                url="http://localhost:5000/api/movements" 
                handle-as="json" 
                last-response="{{movements}}">
              </iron-ajax>

            

              <!-- The array is set as the <vaadin-grid>'s "items" property -->
              <vaadin-grid aria-label="Basic Binding Example" items="[[movements.data.movements]]">

                <vaadin-grid-column width="50px" flex-grow="0">
                  <template class="header">#</template>
                  <template>[[index]]</template>
                  <!-- If necessary, the footer could be set using <template class="footer"> -->
                  <template class="footer">#</template>
                </vaadin-grid-column>

                <vaadin-grid-column>
                  <template class="header">
                    <span draggable="true">
                      Detalle
                    </span>
                  </template>
                  <template>
                    <span draggable="true">
                      [[item.name]]
                    </span>
                  </template>
                  <template class="footer">Detalle</template>
                </vaadin-grid-column>

                <vaadin-grid-column>
                  <template class="header">Monto</template>
                  <template> $  [[item.amount]]</template>
                  <template class="footer">Monto</template>
                </vaadin-grid-column>

                <vaadin-grid-column width="150px">
                  <template class="header">Fecha</template>
                  <template>[[item.release]]</template>
                  <template class="footer">Fecha</template>
                </vaadin-grid-column>

              </vaadin-grid>
            </template>
          </dom-bind>
        </div>
        <p hidden$="[[storedUser.loggedin]]">Debes estar <a href="[[rootPath]]register-login">registrado</a> para acceder al listado de movimientos!</p>
      </div>
    `;
  }
  

  initStoredUser() {
      // if entering site on the secret quotes page, verify if logged in and if so, preload a secret quote
      //if (this.storedUser.loggedin) {
      //    this.getMovimientos();
      //}
  }

  getMovimientos() {
      // add token authorization and generate Ajax request
      //this.$.getListarMovimientosAjax.headers['Authorization'] = 'Bearer ' + this.storedUser.access_token;
      //this.$.getListarMovimientosAjax.generateRequest();
  }

}

window.customElements.define('listar-movimientos', Listar);
