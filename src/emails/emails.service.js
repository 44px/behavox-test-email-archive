/* @ngInject */
export default function($http, Pagination) {
    const SOURCE = 'https://raw.githubusercontent.com/44px/behavox-test-email-archive/master/data.json';

    return {
        search(query) {
            return $http.get(SOURCE).then((response) => filterAndPaginate(query, response.data));
        },

        getInitialQuery() {
            return {
                q: '',
                page: 1,
                perPage: Pagination.getPageSizes()[0]
            };
        }
    };

    function filterAndPaginate(query, data = []) {
        let result = data;

        if (query.q !== '') {
            const normalizedQuery = query.q.toLowerCase();
            result = result.filter((email) => {
                return (email.subject.toLowerCase().includes(normalizedQuery)
                    || email.body.toLowerCase().includes(normalizedQuery)
                );
            });
        }

        return Pagination.paginate(query, result);
    }
}
