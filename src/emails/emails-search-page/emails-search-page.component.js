import template from './emails-search-page.html';

export default {
    controller: EmailsSearchPageController,
    template
};


/* @ngInject */
function EmailsSearchPageController(Emails) {
    const vm = this;

    vm.onQueryChange = (query) => {
        vm.query = query;
        loadData(vm.query);
    };

    vm.$onInit = () => {
        vm.onQueryChange(Emails.getInitialQuery());
    };

    function loadData(query) {
        Emails.search(query).then((list) => {
            vm.list = list;
        });
    }
}
