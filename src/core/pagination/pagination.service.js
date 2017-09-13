export default function() {
    const PAGE_SIZES = [10, 50, 100];

    return {
        getPageSizes() {
            return PAGE_SIZES;
        },

        paginate(query, data = []) {
            const page = Math.max(1, query.page);
            const perPage = query.perPage || PAGE_SIZES[0];
            const firstItem = (page - 1) * perPage;

            return {
                items: data.slice(firstItem, firstItem + perPage),
                totalPages: Math.ceil(data.length / perPage)
            };
        }
    };
}
