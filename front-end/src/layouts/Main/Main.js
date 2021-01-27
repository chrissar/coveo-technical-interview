import React, { PureComponent } from 'react';
import { Grid, Modal, Segment, Header, Image, Button } from 'semantic-ui-react';
import { SearchArea, Results } from '..';
import { CountryFlag, SemanticPagination, DropdownController } from '../../components';
import { Countries, QueryBuilder } from '../../utils';
import QueryController from '../../controllers/QueryController/QueryController';
import './styles.css';
import { DropDownController } from '../../components/FilterControllers';

let countriesUtils = new Countries();
const qb = new QueryBuilder();
const queryController = new QueryController();

export default class Main extends PureComponent {

    state = {
        items: {},
        firstResult: 0,
        numberOfResults: 12,
        q: '',
        query: {},
        modalOpen: false,
        selectedItem: {},
        maxPages: 1,
    }

    async componentDidMount() {
        await this.renderResults();
    }

    async updateQuery(query) {
        qb.setQuery(query.inputValue);
        await this.renderResults();
    }

    async updateLimit(limit) {
        qb.setLimit(limit);
        await this.renderResults();
    }

    async updatePage(page) {
        qb.setPage(page);
        await this.renderResults();
    }

    async renderResults() {
        let items;
        let maxPages = 1;
        try {
            items = await queryController.get(qb.build());
            if(items.totalCountFiltered > 0) {
                maxPages = Math.ceil(items.totalCountFiltered / qb.getLimit());
                console.log(maxPages);
            }
        } catch (e) {
            console.log(e);
        }
        this.setState({ items,maxPages });
    }

    toggleModal(open) {
        this.setState({ modalOpen: open });
    }

    setItem(selected) {
        this.setState({ selectedItem: selected });
    }

    render() {
        const { items, q, selectedItem,maxPages } = this.state;
        return (
            <>
                <SearchArea onChange={(query) => this.updateQuery(query)} />
                <Grid columns={1} container stackable centered className={'results'}>
                    <Grid.Row>
                        <DropDownController onChange={(limit) => { this.updateLimit(limit) }} />
                    </Grid.Row>
                    <Grid.Row>
                        <SemanticPagination maxPages={maxPages} onChange={(page) => { this.updatePage(page) }} />
                    </Grid.Row>
                    <Results results={items} updateSelection={(item) => { this.setItem(item) }} />
                </Grid>
            </>
        )
    }
}