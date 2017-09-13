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

        searchUsers(query = '') {
            return getUsers().then((users) => {
                if (query === '') {
                    return users;
                }

                const normalizedQuery = query.toLowerCase();
                return users.filter((user) => user.toLowerCase().includes(normalizedQuery));
            });
        },

        getInitialQuery() {
            return {
                q: '',
                users: [],
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

    function getUsers() {
        return getData().then((data) => {
            const users = {};
            data.forEach((email) => {
                users[email.from] = true;
                ['to', 'cc', 'bcc'].forEach((list) => {
                    email[list].forEach((emailAddress) => {
                        users[emailAddress] = true;
                    });
                });
            });
            return Object.keys(users);
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

        if (query.users.length) {
            result = result.filter((email) => {
                return (query.users.includes(email.from)
                    || email.to.some((user) => query.users.includes(user))
                    || email.cc.some((user) => query.users.includes(user))
                    || email.bcc.some((user) => query.users.includes(user))
                );
            });
        }

        return Pagination.paginate(query, result);
    }
}
