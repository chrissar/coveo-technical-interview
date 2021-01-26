import React, { PureComponent } from 'react';
import { Grid, Segment } from 'semantic-ui-react';
import { ResultCard } from '../../components';
import { Countries } from '../../utils';
import QueryController from '../../controllers/QueryController/QueryController';
let queryController = new QueryController();
let countriesUtils = new Countries();

export default class Results extends PureComponent {

    state = {
        items: {},
    }

    async componentDidMount() {
        await this.renderResults();
    }

    async renderResults() {
        let items;
        try {
            items = await queryController.get();
            console.log(items);
        } catch (e) {
            console.log(e);
        }
        this.setState({ items });
    }

    displayResults() {
        const { items } = this.state;
        let render = [];
        if (Object.keys(items).length > 0 && items.constructor === Object) {
            render = items.results.map((result, index) => {
                return (
                    <Grid.Column key={index}>
                        <ResultCard product={result} />
                    </Grid.Column>
                );
            })
        }
        return render;
    }

    render() {
        return (
            <Grid columns={3} container doubling stackable padded>
                {this.displayResults()}
            </Grid>
        )
    }
}