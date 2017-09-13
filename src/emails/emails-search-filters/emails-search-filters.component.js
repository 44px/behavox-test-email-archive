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
function EmailsSearchFiltersController(Emails) {
    const vm = this;

    vm.searchUsers = (query) => Emails.searchUsers(query);

    vm.$onChanges = ({query}) => {
        if (query.currentValue) {
            vm.model = {
                q: vm.query.q,
                users: vm.query.users
            };
        }
    };
}
