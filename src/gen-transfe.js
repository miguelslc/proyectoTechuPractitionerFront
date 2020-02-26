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
import '@polymer/paper-material/paper-material';
import '@polymer/iron-ajax/iron-ajax.js';
import '@polymer/iron-localstorage/iron-localstorage.js';
import '@polymer/iron-input/iron-input.js';
import '@polymer/paper-input/paper-input';
import '@polymer/paper-input/paper-input-container.js';
import '@polymer/iron-form/iron-form';
import '@polymer/paper-button/paper-button';

import './shared-styles.js';

class Transferencia extends PolymerElement {

  static get is() { return 'gen-transfe'; }

  static get properties() {
    return {
      formData: {
        type: Object,
        value: {}
      },
      storedUser: Object,
    }
  }

  static get template() {
    return html`
      <style include="shared-styles">
        :host {
          display: block;

          padding: 10px;
        }

        body {
          font-family: 'Roboto', 'Noto', sans-serif;
          font-size: 14px;
          margin: 0;
          padding: 24px;
          max-width: 500px;
          background-color: #FAFAFA;
        }
        
        .form-title {
          margin-bottom: 20px;
        }
      
        .avatar {
          display: inline-block;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          overflow: hidden;
          background: #3367d6;
          margin-right: 20px;
        }
      
        .company {
          color: #3367d6;
          font-size: 20px;
          font-weight: 200;
        }

        gold-cc-expiration-input {
          width: 20%;
          margin-right: 20px;
        }

        gold-cc-cvc-input {
          width: 20%;
          margin-right: 20px;
        }
        paper-button {
          background-color: #4285f4;
          color: #fff;
          margin-top: 50px;
          width: 100%;
        }
        input {
          position: relative; /* to make a stacking context */
          outline: none;
          box-shadow: none;
          margin: 0;
          padding: 0;
          width: 100%;
          max-width: 100%;
          background: transparent;
          border: none;
          color: var(--paper-input-container-input-color, var(--primary-text-color));
          -webkit-appearance: none;
          text-align: inherit;
          vertical-align: bottom;
          /* Firefox sets a min-width on the input, which can cause layout issues */
          min-width: 0;
          @apply --paper-font-subhead;
          @apply --paper-input-container-input;
        }
      </style>
      <iron-ajax
        id="transfeForm"
        method="post"
        content-type="application/json"
        handle-as="text"
        on-response="handleUserResponse"
        on-error="handleUserError">
      </iron-ajax>

      <iron-localstorage name="user-storage" value="{{storedUser}}"></iron-localstorage>
      <brum-global-variable key="userData" value="{{storedUser}}"></brum-global-variable>
      
      <div class="card">
        <H1>Formularo de Transferencias</H1>

            <paper-input-container>
              <label slot="input">Username</label>
              <iron-input slot="input" bind-value="{{formData.name}}">
                <input  id="name" type="text" value="{{formData.name}}" placeholder="Username">
              </iron-input>
            </paper-input-container>

            <paper-input-container>
              <label slot="input">Account</label>
              <iron-input slot="input" bind-value="{{formData.account}}">
                <input  id="name" type="text" value="{{formData.account}}" placeholder="Account">
              </iron-input>
            </paper-input-container>

            <paper-input-container>
              <label slot="input">Amount</label>
              <iron-input slot="input" bind-value="{{formData.amount}}">
                <input  id="amount" type="text" value="{{formData.amount}}" placeholder="Amount">
              </iron-input>
            </paper-input-container>
            
            <paper-button on-click="_submit">Transferir</paper-button>
          
        
        </ br>
        

      </div>
    `;
  }

  _setReqBody(){
    var hoy = new Date();
    var dd = hoy.getDate();
    var mm = hoy.getMonth()+1;
    var yyyy = hoy.getFullYear();

    if(dd<10)
      dd='0'+dd; //agrega cero si el menor de 10
    if(mm<10)
      mm='0'+mm
 
    this.$.transfeForm.body = {movement: this.formData};
    this.$.transfeForm.body.movement.release = yyyy+"-"+mm+"-"+dd;
    this.$.transfeForm.body.movement.detail = "Transferencia";
    this.$.transfeForm.body.movement.email = this.storedUser.email;
  }

  _submit() {
    this.$.transfeForm.url = window.Polymer.apihost + '/api/movements';
    this._setReqBody();
    this.$.transfeForm.generateRequest();
  }

  handleUserResponse(event){
    //var response = event.detail.response;
    // redirect to movimentos
    this.set('route.path', '/listar-movimientos');
    this.formData = {}
    console.log(event);
  }

  handleUserError(event) {
    let errors = event.detail.request.xhr.response;
    this.error = '';
    let that = this;
    Object.keys(errors).map(function(key, index) {
      that.error = that.error + ' ' + errors[key];
    });
  }
}

window.customElements.define('gen-transfe', Transferencia);