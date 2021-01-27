export default class QueryBuilder {
    limit = 10;
    page = 1;

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

    setAdvancedQuery(field, query) {
        if (!field && !query) { this.aq = undefined; }
        else { this.aq = `(${field}==("${query}"))`; }
    }

    build() {
        return {
            numberOfResults: this.limit,
            firstResult: this.calculateFirstResult(this.limit, this.page),
            q: this.query,
            aq: this.aq,
            sortCriteria: this.buildCriteria(),
        }
    }

    getCountries() {
        return {
            numberOfResults: 0,
            q: '@sysuri',
            maximumNumberOfValues: 20,
            sortCriteria: 'occurences',
            field: "@tppays",
        }
    }

    calculateFirstResult(limit = 1, page = 1) {
        return limit * (page - 1);
    }

    buildCriteria() {
        if (!this.criteria && !this.direction) return;
        return `${this.criteria} ${this.direction || ''}`.trim();
    }
}