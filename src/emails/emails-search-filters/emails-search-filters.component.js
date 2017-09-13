import angular from 'angular';
import template from './emails-search-filters.html';

export default {
    bindings: {
        query: '<',
        onChange: '&'
    },
    controller: EmailsSearchFiltersController,
    template
};


/* @ngInject */
function EmailsSearchFiltersController() {
    const vm = this;

    vm.$onChanges = ({query}) => {
        if (query.currentValue) {
            vm.model = angular.copy(query.currentValue);
        }
    };
}
