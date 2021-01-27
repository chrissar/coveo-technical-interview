import React, { PureComponent } from 'react';
import { Grid, Input, Pagination, Segment } from 'semantic-ui-react'

export default class SemanticPagination extends PureComponent {

    static defaultProps = {
        maxPages: 1,
        onChange: () => { },
    }

    state = {
        activePage: 1,
    }

    handlePaginationChange(e, { activePage }) {
        const { maxPages, onChange } = this.props;
        if (activePage <= maxPages) {
            this.setState({ activePage })
            onChange(activePage);
        }
    }

    render() {
        const { activePage } = this.state
        const { maxPages } = this.props;
        return (
            <Pagination
                activePage={activePage}
                onPageChange={(e, value) => this.handlePaginationChange(e, value)}
                totalPages={maxPages}
            />
        );
    }
}