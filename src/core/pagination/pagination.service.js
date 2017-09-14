export default function() {
    const PAGE_SIZES = [10, 50, 100];

    return {
        getPageSizes() {
            return PAGE_SIZES;
        },

        getUpdatedQuery(query, queryUpdate) {
            const resetPage = Object.keys(queryUpdate).some((field) => field !== 'page');
            return Object.assign({}, query, queryUpdate, {
                page: resetPage ? 1 : queryUpdate.page
            });
        },

        paginate(query, data = []) {
            const page = Math.max(1, query.page);
            const perPage = parseInt(query.perPage, 10) || PAGE_SIZES[0];
            const firstItem = (page - 1) * perPage;

            return {
                items: data.slice(firstItem, firstItem + perPage),
                totalPages: Math.ceil(data.length / perPage)
            };
        }
    };
}
