import template from './emails-search-page.html';

export default {
    controller: EmailsSearchPageController,
    template
};


/* @ngInject */
function EmailsSearchPageController(Emails, Pagination) {
    const vm = this;

    vm.onQueryChange = (changes) => {
        vm.query = Pagination.getUpdatedQuery(vm.query, changes);
        loadData(vm.query);
    };

    vm.$onInit = () => {
        vm.onQueryChange(Emails.getInitialQuery());
    };

    function loadData(query) {
        Emails.search(query).then((data) => {
            vm.data = data;
        });
    }
}
