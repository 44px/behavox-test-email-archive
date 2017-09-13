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

    vm.onPageChange = (page) => {
        const query = Object.assign({}, vm.query, {page});
        vm.onChange({query});
    };

    vm.onPageSizeChange = (perPage) => {
        const query = Object.assign({}, vm.query, {perPage});
        vm.onChange({query});
    };

    vm.$onInit = () => {
        vm.pageSizes = Pagination.getPageSizes();
    };

    vm.$onChanges = () => {
        vm.selectedPageSize = vm.query.perPage;
    };
}
