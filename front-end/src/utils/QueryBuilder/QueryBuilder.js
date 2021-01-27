export default class QueryBuilder {
    limit = 12;
    page = 1;
    criteria = '@tpmillesime';
    direction = 'ascending';

    getLimit() {
        return this.limit;
    }

    setLimit(limit) {
        this.limit = limit;
        return this;
    }

    getPage() {
        return this.page;
    }

    setPage(page) {
        this.page = page;
        return this;
    }

    setQuery(query) {
        this.query = query;
        return this;
    }

    setSortCriteria(criteria, direction) {
        this.criteria = criteria;
        this.direction = direction;
    }

    build() {
        return {
            numberOfResults: this.limit,
            firstResult: this.calculateFirstResult(this.limit, this.page),
            q: this.query,
            sortCriteria: (`${this.criteria} ${this.direction || ''}`).trim(),
        }
    }

    calculateFirstResult(limit = 1, page = 1) {
        return limit * (page - 1);
    }
}