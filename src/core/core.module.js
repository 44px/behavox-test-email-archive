import angular from 'angular';
import uiRouter from '@uirouter/angularjs';
import ngMaterial from 'angular-material';

import PaginationService from './pagination/pagination.service';
import ArrayToStringFilter from './array-to-string.filter';
import PaginationComponent from './pagination/pagination.component';
import AppComponent from './app/app.component';
import './base.scss';

export default angular.module('app.core', [
    ngMaterial,
    uiRouter
])
    .factory('Pagination', PaginationService)
    .filter('arrayToString', ArrayToStringFilter)
    .component('pagination', PaginationComponent)
    .component('app', AppComponent)
    .config(($urlServiceProvider) => {
        $urlServiceProvider.rules.otherwise({
            state: 'emails.search'
        });
    })
    .name;
