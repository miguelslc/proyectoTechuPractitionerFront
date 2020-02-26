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
import '@polymer/paper-input/paper-input-container.js';
import '@polymer/paper-button/paper-button.js';
import '@polymer/app-route/app-location.js'
import '../node_modules/brum-global-variable/brum-global-variable.js'
import '@polymer/polymer/lib/elements/dom-if.js';
import './log-out.js';
import './shared-styles.js';

class Register extends PolymerElement {

  static get is() { return 'register-login'; }

  static get properties() {
    return {
      formData: {
        type: Object,
        value: {}
      },
      storedUser: Object,
      error: String,
      registration:{
        type: Boolean,
        value: false
      }
    }
  }


  static get template() {
    return html`
      <style include="shared-styles">
        :host {
          display: block;

          padding: 10px;
        }
        .wrapper-btns {
          margin-top: 15px;
        }
        paper-button.link {
          color: #757575;
        }
        .alert-error {
          background: #ffcdd2;
          border: 1px solid #f44336;
          border-radius: 3px;
          color: #333;
          font-size: 14px;
          padding: 10px;
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
        id="registerLoginAjax"
        method="post"
        content-type="application/json"
        handle-as="text"
        on-response="handleUserResponse"
        on-error="handleUserError">
      </iron-ajax>

      <iron-localstorage name="user-storage" value="{{storedUser}}"></iron-localstorage>
      <brum-global-variable key="userData" value="{{storedUser}}"></brum-global-variable>
      
      <app-location route="{{route}}"></app-location>

      <div class="card">
        <div id="unauthenticated" hidden$="[[storedUser.loggedin]]">
          <h1>Log In</h1>
          <p><strong>Log in</strong> or <strong>sign up</strong> to Access </p>

          <template is="dom-if" if="[[error]]">
            <p class="alert-error"><strong>Error:</strong> [[error]]</p>
          </template>
          


            <paper-input-container>
              <label slot="input">Username</label>
              <iron-input slot="input" bind-value="{{formData.name}}">
                <input  id="name" type="text" value="{{formData.name}}" placeholder="Username">
              </iron-input>
            </paper-input-container>


            <paper-input-container>
              <label slot="input">Email</label>
              <iron-input slot="input" bind-value="{{formData.email}}">
                <input  id="email" type="text" value="{{formData.email}}" placeholder="Email">
              </iron-input>
            </paper-input-container>

            <paper-input-container>
              <label slot="input">Password</label>
              <iron-input slot="input" bind-value="{{formData.password}}">
                <input id="password" type="password" value="{{formData.password}}" placeholder="Password">
              </iron-input>
            </paper-input-container>

            <div class="wrapper-btns">
              <paper-button raised class="primary" on-tap="postLogin">Log In</paper-button>
              <paper-button class="link" on-tap="postRegister">Sign Up</paper-button>
            </div>
          </div>
          <div id="authenticated" hidden$="[[!storedUser.loggedin]]">
            <h2>Hello, [[storedUser.name]]!</h2>
            <p>You are currently logged in. You can access <a href="/listar-movimientos">Movimentos</a>!</p>
            <log-out stored-user="{{storedUser}}"></log-out>
          </div>
        </div>

    `;
  }

  _setReqBody(){
    this.$.registerLoginAjax.body = {user: this.formData};
  }

  postLogin(){
    
    this.$.registerLoginAjax.url = window.Polymer.apihost + '/api/users/login';
    this._setReqBody();
    this.$.registerLoginAjax.generateRequest();
  }

  postRegister(){
    
    this.$.registerLoginAjax.url = window.Polymer.apihost +  '/api/users/register';
    this._setReqBody();
    this.$.registerLoginAjax.generateRequest();
  }

  handleUserResponse(event){
    
    let response = JSON.parse(event.detail.response);
    console.log(response);
    if (response.user && response.user.token) {
        this.error = '';
        this.storedUser = {
          name: response.user.name,
          email: response.user.email,
          token: response.user.token,
          loggedin: true
      };
      // redirect to movimentos
      this.set('route.path', '/listar-movimientos');
    }
    
    this.formData = {}
  }

  handleUserError(event) {
    let errors = event.detail.request.xhr.response;
    this.error = '';
    let that = this;
    Object.keys(errors).map(function(key, index) {
      that.error = that.error + ' ' + errors[key];
    });
  }

  isRegister(){
    this.registration = !this.registration;
  }
}

window.customElements.define('register-login', Register);
