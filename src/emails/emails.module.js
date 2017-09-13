import angular from 'angular';
import EmailsService from './emails.service';
import EmailsSearchFiltersComponent from './emails-search-filters/emails-search-filters.component';
import EmailsSearchListComponent from './emails-search-list/emails-search-list.component';
import EmailsSearchPageComponent from './emails-search-page/emails-search-page.component';

export default angular.module('app.emails', [])
    .factory('Emails', EmailsService)
    .component('emailsSearchFilters', EmailsSearchFiltersComponent)
    .component('emailsSearchList', EmailsSearchListComponent)
    .component('emailsSearchPage', EmailsSearchPageComponent)
    .config(($stateProvider) => {
        $stateProvider.state('emails', {
            abstract: true,
            url: ''
        }).state('emails.search', {
            url: '/search',
            component: 'emailsSearchPage'
        }).state('emails.view', {
            url: '/view/:id',
            params: {
                id: {
                    type: 'int'
                }
            },
            resolve: {
                email: (Emails, $stateParams) => {
                    /* @ngInject */
                    return Emails.get($stateParams.id);
                }
            },
            template: 'Email: {{ $resolve.email }}'
        });
    })
    .name;
