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
        await this.getCountryList();
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

    async updateCriteria(values) {
        if (values) {
            const [criteria, direction] = values.split(' ');
            qb.setSortCriteria(criteria, direction);
            await this.renderResults();
        }
    }

    async updateAq(values) {
        if (values && values !== 'Tous') {
            const [field, query] = values.split(',');
            qb.setAdvancedQuery(field, query);
            await this.renderResults();
        } else {
            qb.setAdvancedQuery(undefined, undefined);
            await this.renderResults();
        }
    }

    async getCountryList() {
        let items;
        try {
            items = await queryController.get(qb.getCountries());
        } catch (e) {
            console.log(e);
        }
        this.setState({ countries: items });
    }

    async renderResults() {
        let items;
        let maxPages = 1;
        try {
            items = await queryController.get(qb.build());
            if (items.totalCountFiltered > 0) {
                maxPages = Math.ceil(items.totalCountFiltered / qb.getLimit());
                console.log(maxPages);
            }
        } catch (e) {
            console.log(e);
        }
        this.setState({ items, maxPages });
    }

    render() {
        const { items, q, selectedItem, maxPages } = this.state;
        const criteriaOptions = [
            {
                key: 0,
                text: 'Relevance',
                value: 'relevancy',
            },
            {
                key: 1,
                text: 'Prix croissant',
                value: '@tpprixnum ascending',
            },
            {
                key: 2,
                text: 'Prix décroissant',
                value: '@tpprixnum descending',
            },
            {
                key: 3,
                text: 'Millesime croissant',
                value: 'tpmillesime ascending',
            },
            {
                key: 4,
                text: 'Millesime décroissant',
                value: 'tpmillesime descending',
            },
        ];

        const countryOptions = [
            {
                key: 0,
                text: 'Tous',
                value: 'Tous',
            },
            {
                key: 1,
                text: 'France',
                value: '@tppays,France',
            },
            {
                key: 2,
                text: 'Canada',
                value: '@tppays,Canada',
            },
            {
                key: 3,
                text: 'Espagne',
                value: '@tppays,Espagne',
            },
            {
                key: 4,
                text: 'Maroc',
                value: '@tppays,Maroc',
            },
        ];
        return (
            <>
                <SearchArea onChange={(query) => this.updateQuery(query)} />
                <Grid columns={1} container stackable centered className={'results'}>
                    <Grid.Row columns={3} divided centered>
                        <Grid.Column>
                            <DropDownController options={countryOptions} onChange={(value) => { this.updateAq(value) }} />
                        </Grid.Column>
                        <Grid.Column>
                            <DropDownController options={criteriaOptions} onChange={(value) => { this.updateCriteria(value) }} />
                        </Grid.Column>
                        <Grid.Column>
                            <DropDownController onChange={(limit) => { this.updateLimit(limit) }} />
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <SemanticPagination maxPages={maxPages} onChange={(page) => { this.updatePage(page) }} />
                    </Grid.Row>
                    <Results results={items} />
                </Grid>
            </>
        )
    }
}