/* @ngInject */
export default function($http) {
    const ITEMS_PER_PAGE = 10;
    const SOURCE = 'https://raw.githubusercontent.com/44px/behavox-test-email-archive/master/data.json';

    return {
        search(query) {
            return $http.get(SOURCE).then((response) => filterAndPaginate(query, response.data));
        },

        getInitialQuery() {
            return {
                q: '',
                page: 1,
                perPage: ITEMS_PER_PAGE
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

        return paginate(query, result);
    }

    function paginate(query, data = []) {
        const page = Math.max(1, query.page);
        const perPage = query.perPage || ITEMS_PER_PAGE;
        const firstItem = (page - 1) * perPage;
        return data.slice(firstItem, firstItem + perPage);
    }
}
