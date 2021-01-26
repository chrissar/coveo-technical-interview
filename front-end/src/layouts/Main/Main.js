import React, { PureComponent } from 'react';
import { Grid, Segment } from 'semantic-ui-react';
import { SearchArea, Results } from '..';
import QueryController from '../../controllers/QueryController/QueryController';
import './styles.css';

const queryController = new QueryController();

export default class Main extends PureComponent {

    state = {
        items: {},
        firstResult: 0,
        numberOfResults: 12,
        q: '',
        query: {},
    }

    async componentDidMount() {
        await this.buildQuery();
        await this.renderResults();
    }

    async buildQuery() {
        const { firstResult, numberOfResults, q } = this.state;
        const query = { firstResult, numberOfResults, q };
        this.setState((state) => ({ query: query }));
    }

    async updateQuery(query) {
        this.setState((state) => ({q: query.inputValue}));
        await this.buildQuery();
        await this.renderResults();
    }

    async renderResults() {
        const { query } = this.state;
        let items;
        try {
            items = await queryController.get(query);
        } catch (e) {
            console.log(e);
        }
        this.setState({ items });
    }

    render() {
        const { items, q } = this.state;
        return (
            <>
                <SearchArea value={q} onChange={(query) => this.updateQuery(query)} />
                <Grid columns={1} container stackable centered className={'results'}>
                    <Results results={items} />
                </Grid>
            </>
        )
    }
}