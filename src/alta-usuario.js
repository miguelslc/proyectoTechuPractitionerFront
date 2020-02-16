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
import './shared-styles.js';

class Usuario extends PolymerElement {
  static get template() {
    return html`
      <style include="shared-styles">
        :host {
          display: block;

          padding: 10px;
        }
      </style>

      <div class="card">
        <div class="circle">U</div>
        <h1>View USUARIO</h1>
        </ br>

        <dom-bind>
<template is="dom-bind">
  <!-- Fetch an array of users to be shown in the grid -->
  <iron-ajax auto url="https://demo.vaadin.com/demo-data/1.0/people?count=200" handle-as="json" last-response="{{users}}"></iron-ajax>

  <!-- The array is set as the <vaadin-grid>'s "items" property -->
  <vaadin-grid aria-label="Basic Binding Example" items="[[users.result]]">

    <vaadin-grid-column width="50px" flex-grow="0">
      <template class="header">#</template>
      <template>[[index]]</template>
      <!-- If necessary, the footer could be set using <template class="footer"> -->
      <template class="footer">#</template>
    </vaadin-grid-column>

    <vaadin-grid-column>
      <template class="header">
        <span draggable="true">
          First Name
        </span>
      </template>
      <template>
        <span draggable="true">
          [[item.firstName]]
        </span>
      </template>
      <template class="footer">First Name</template>
    </vaadin-grid-column>

    <vaadin-grid-column>
      <template class="header">Last Name</template>
      <template>[[item.lastName]]</template>
      <template class="footer">Last Name</template>
    </vaadin-grid-column>

    <vaadin-grid-column width="150px">
      <template class="header">Address</template>
      <template>
        <p style="white-space: normal">[[item.address.street]], [[item.address.city]]</p>
      </template>
      <template class="footer">Address</template>
    </vaadin-grid-column>

  </vaadin-grid>

  </br>
        
      </div>
    `;
  }
}

window.customElements.define('alta-usuario', Usuario);