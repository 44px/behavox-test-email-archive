import template from './pagination.html';

export default {
    bindings: {
        query: '<',
        totalPages: '<',
        onChange: '&'
    },
    controller: PaginationController,
    template
};

/* @ngInject */
function PaginationController(Pagination) {
    const vm = this;

    vm.onPageChange = (page) => vm.onChange({query: {page}});

    vm.onPageSizeChange = (perPage) => vm.onChange({query: {perPage}});

    vm.$onInit = () => {
        vm.pageSizes = Pagination.getPageSizes();
    };

    vm.$onChanges = () => {
        vm.selectedPageSize = vm.query.perPage;
    };
}
