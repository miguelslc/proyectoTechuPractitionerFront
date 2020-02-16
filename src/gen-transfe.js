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

import '@polymer/iron-input/iron-input.js';
import '@polymer/paper-input/paper-input';
import '@polymer/paper-input/paper-input-container.js';
import '@polymer/iron-form/iron-form';
import '@polymer/paper-button/paper-button';
import '@polymer/gold-cc-input/gold-cc-input';
import '@polymer/gold-cc-cvc-input/gold-cc-cvc-input';
import '@polymer/gold-cc-expiration-input/gold-cc-expiration-input';

import './shared-styles.js';

class Transferencia extends PolymerElement {

  static get is() { return 'gen-transfe'; }

  static get properties() {
    return {
      formData: {
        type: Object,
        value: {}
      },
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

      <div class="card">
        <H1>Formularo de Transferencias</H1>
        <dom-module id="checkout-form">

          <div class="horizontal layout center form-title">
            <div class="avatar" item-icon></div>
            <div class="flex company">ACME Goods Co.</div>
          </div>
      
          <form is="iron-form" id="transfeForm" action="/">
            <!--<paper-input name="name" label="Name on card" required autocomplete="cc-name"  ></paper-input>-->

            <paper-input-container>
              <label slot="input">Username</label>
              <iron-input slot="input" bind-value="{{formData.username}}">
                <input  id="username" type="text" value="{{formData.username}}" placeholder="Username">
              </iron-input>
            </paper-input-container>


            <gold-cc-input name="cc-number" required auto-validate card-type="{{typeOfCard}}"  ></gold-cc-input>

            <div class="horizontal layout">
              <gold-cc-expiration-input name="cc-expiration" required auto-validate label="Expiration"></gold-cc-expiration-input>
              <gold-cc-cvc-input name="cc-cvc" required auto-validate card-type="[[typeOfCard]]"></gold-cc-cvc-input>
            </div>


            <paper-input-container>
              <label slot="input">Amount</label>
              <iron-input slot="input" bind-value="{{formData.amount}}">
                <input  id="amount" type="text" value="{{formData.amount}}" placeholder="Amount">
              </iron-input>
            </paper-input-container>

            
            
            <!--<paper-input name="amount" label="Amount" required ></paper-input>-->
            <paper-button on-click="_submit">Transferir</paper-button>
          </form>
        </dom-module>
        </ br>
        

      </div>
    `;
  }

  _setReqBody(){
    this.$.transfeForm.body = {user: this.transfeForm};
  }

  _submit() {
    this.$.transfeForm.submit();
    this.$.transfeForm.url = 'http://localhost:3000/api/account/';
    this.$.registerLoginAjax.generateRequest();
  }

  handleUserResponse(event){
    var response = event.detail.response;
    this.formData = {}
    // redirect to movimentos
    this.set('route.path', '/lista-movimientos');
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