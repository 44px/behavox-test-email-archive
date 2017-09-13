import template from './emails-search-list.html';

export default {
    bindings: {
        data: '<',
        query: '<',
        onChange: '&'
    },
    template
};
