import angular from 'angular';
import uiRouter from '@uirouter/angularjs';
import ngMaterial from 'angular-material';

import AppComponent from './app/app.component';
import './base.scss';

export default angular.module('app.core', [
    ngMaterial,
    uiRouter
])
    .component('app', AppComponent)
    .config(($urlServiceProvider) => {
        $urlServiceProvider.rules.otherwise({
            state: 'emails.search'
        });
    })
    .name;
