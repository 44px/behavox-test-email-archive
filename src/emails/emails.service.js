/* @ngInject */
export default function($http, Pagination) {
    const SOURCE = 'https://raw.githubusercontent.com/44px/behavox-test-email-archive/master/data.json';

    return {
        search(query) {
            return getData().then((data) => filterAndPaginate(query, data));
        },

        get(id) {
            return getData().then((data) => {
                const emailById = data.find((email) => email.id === id);
                if (!emailById) {
                    throw new Error('Not found');
                }
                return emailById;
            });
        },

        getInitialQuery() {
            return {
                q: '',
                page: 1,
                perPage: Pagination.getPageSizes()[0]
            };
        }
    };

    function getData() {
        return $http.get(SOURCE, {cache: true}).then((response) => {
            return response.data.map((email, id) => {
                return Object.assign({}, email, {id});
            });
        });
    }

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
