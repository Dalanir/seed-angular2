/**
 * Created by lorho_j on 26/10/15.
 */

import { bootstrap } from 'angular2/angular2';
import { ROUTER_BINDINGS } from 'angular2/router';
import { Book } from './services/serviceBook/serviceBook';

import { App } from './components/app';

bootstrap(App, [ROUTER_BINDINGS, Book]);