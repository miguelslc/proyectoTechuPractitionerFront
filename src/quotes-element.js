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

class Quotes extends PolymerElement {

  static get is() { return 'quotes-element'; }

  static get template() {
    return html`
      
        <iron-ajax id="quotes-ajax"
          auto
          loading="{{activeRequest}}"
          url='https://quotesondesign.com/wp-json/wp/v2/posts/?orderby=rand'
          handle-as="json"
          last-response="{{quotesResponse}}">
        </iron-ajax>
 
        <template is="dom-if" if="[[quotesResponse]]">
          </br>
          <h3><span> [[quotesResponse.1.excerpt.rendered]] </span></h3>
          <h3><span> [[quotesResponse.1.title.rendered]] </span></h3>
        </template>
    `;
  }
}

window.customElements.define('quotes-element', Quotes);
