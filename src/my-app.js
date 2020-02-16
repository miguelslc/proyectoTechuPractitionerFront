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
import { setPassiveTouchGestures, setRootPath } from '@polymer/polymer/lib/utils/settings.js';
import '@polymer/app-layout/app-drawer/app-drawer.js';
import '@polymer/app-layout/app-drawer-layout/app-drawer-layout.js';
import '@polymer/app-layout/app-header/app-header.js';
import '@polymer/app-layout/app-header-layout/app-header-layout.js';
import '@polymer/app-layout/app-scroll-effects/app-scroll-effects.js';
import '@polymer/app-layout/app-toolbar/app-toolbar.js';
import '@polymer/app-route/app-location.js';
import '@polymer/app-route/app-route.js';
import '@polymer/iron-pages/iron-pages.js';
import '@polymer/iron-selector/iron-selector.js';
import '@polymer/paper-icon-button/paper-icon-button.js';

import '@polymer/iron-localstorage/iron-localstorage.js';
import '../node_modules/brum-global-variable/brum-global-variable.js'
import './log-out.js';
import './my-icons.js';

// Gesture events like tap and track generated from touch will not be
// preventable, allowing for better scrolling performance.
setPassiveTouchGestures(true);

// Set Polymer's root path to the same value we passed to our service worker
// in `index.html`.
setRootPath(MyAppGlobals.rootPath);

class MyApp extends PolymerElement {
  static get template() {
    return html`
      <style>
        :host {
          --app-primary-color: #4285f4;
          --app-secondary-color: black;

          display: block;
        }

        app-drawer-layout:not([narrow]) [drawer-toggle] {
          display: none;
        }

        app-header {
          color: #fff;
          background-color: var(--app-primary-color);
        }

        app-header paper-icon-button {
          --paper-icon-button-ink-color: white;
        }

        .drawer-list {
          margin: 0 20px;
        }

        .drawer-list a {
          display: block;
          padding: 0 16px;
          text-decoration: none;
          color: var(--app-secondary-color);
          line-height: 40px;
        }

        .drawer-list a.iron-selected {
          color: black;
          font-weight: bold;
        }

        app-header .greeting,
        app-header a {
          color: #fff;
          font-size: 13px;
        }

        app-header .greeting {
          border-right: 1px solid rgba(255,255,255,.5);
          display: inline-block;
          padding-right: 6px;
        }
      </style>

      <app-location route="{{route}}" url-space-regex="^[[rootPath]]">
      </app-location>

      <app-route route="{{route}}" pattern="[[rootPath]]:page" data="{{routeData}}" tail="{{subroute}}">
      </app-route>

      <iron-localstorage name="user-storage" value="{{storedUser}}"></iron-localstorage>
      <brum-global-variable key="userData" value="{{storedUser}}"></brum-global-variable>

      
      <app-drawer-layout fullbleed="" narrow="{{narrow}}">
        <!-- Drawer content -->
        <app-drawer id="drawer" slot="drawer" swipe-open="[[narrow]]">
          <app-toolbar>Menu</app-toolbar>
          <iron-selector selected="[[page]]" attr-for-selected="name" class="drawer-list" role="navigation">

            <div name="index-home">
              <a href="[[rootPath]]index-home">Home</a>       
            </div>
            
            
              <a href="[[rootPath]]listar-movimientos">Movimentos</a>
            
         
            
              <a href="[[rootPath]]alta-usuario">Usuario</a>

              <a href="[[rootPath]]gen-transfe">Transferencia</a>
            

          </iron-selector>
        </app-drawer>

        <!-- Main content -->
        <app-header-layout has-scrolling-region="">
          <app-header slot="header" condenses reveals effects="waterfall">
            <app-toolbar>
              <paper-icon-button icon="my-icons:menu" drawer-toggle=""></paper-icon-button>
              <div main-title="">Super Genial App</div>
              <a name="register-login" href="[[rootPath]]register-login" hidden$="[[storedUser.loggedin]]">Log in</a>
              <div hidden$="[[!storedUser.loggedin]]">
                <span class="greeting">Hi [[storedUser.name]]!</span>
                <log-out stored-user="" link></log-out>
              </div>
            </app-toolbar>
          </app-header>

          <iron-pages selected="[[page]]" attr-for-selected="name" fallback-selection="not-found" role="main">
            <index-home name="index-home"></index-home>
            <register-login name="register-login"></register-login>
            <listar-movimientos name="listar-movimientos"></listar-movimientos>
            <alta-usuario name="alta-usuario"></alta-usuario>
            <gen-transfe name="gen-transfe"></gen-transfe>
            <not-found name="not-found"></not-found>
          </iron-pages>
        </app-header-layout>
      </app-drawer-layout>
    `;
  }
  static get is() { return 'my-app'; }

  static get properties() {
    return {
      page: {
        type: String,
        reflectToAttribute: true,
        observer: '_pageChanged'
      },
      routeData: Object,
      subroute: Object,
      storedUser: Object,
    };
  }

  static get observers() {
    return [
      '_routePageChanged(routeData.page)'
    ];
  }

  _routePageChanged(page) {
     // Show the corresponding page according to the route.
     //
     // If no page was found in the route data, page will be an empty string.
     // Show 'view1' in that case. And if the page doesn't exist, show 'view404'.
    if (!page) {
      this.page = 'index-home';
    } else if (['index-home', 'register-login', 'listar-movimientos', 'alta-usuario', 'gen-transfe'].indexOf(page) !== -1) {
      this.page = page;
    } else {
      this.page = 'not-found';
    }

    // Close a non-persistent drawer when the page & route are changed.
    if (!this.$.drawer.persistent) {
      this.$.drawer.close();
    }
  }

  _pageChanged(page) {
    // Import the page component on demand.
    //
    // Note: `polymer build` doesn't like string concatenation in the import
    // statement, so break it up.
    switch (page) {
      case 'index-home':
        import('./index-home');
        break;
      case 'register-login':
        import('./register-login');
        break;
      case 'listar-movimientos':
        import('./listar-movimientos.js');
        break;
        case 'alta-usuario':
        import('./alta-usuario.js');
        break;
        case 'gen-transfe':
        import('./gen-transfe.js');
        break;
      case 'not-found':
        import('./not-found.js');
        break;
    }
  }
}

window.customElements.define('my-app', MyApp);
