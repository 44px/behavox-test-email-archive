import angular from 'angular';
import EmailsSearchPageComponent from './emails-search-page/emails-search-page.component';

export default angular.module('app.emails', [])
    .component('emailsSearchPage', EmailsSearchPageComponent)
    .config(($stateProvider) => {
        $stateProvider.state('emails', {
            abstract: true,
            url: ''
        }).state('emails.search', {
            url: '/search',
            component: 'emailsSearchPage'
        });
    })
    .name;
