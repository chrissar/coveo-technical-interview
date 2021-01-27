import React, { PureComponent } from 'react';
import { Grid, Label, Pagination, Segment } from 'semantic-ui-react';
import { ResultCard } from '../../components';
import { Countries } from '../../utils';
import QueryController from '../../controllers/QueryController/QueryController';
let queryController = new QueryController();
let countriesUtils = new Countries();

export default class Results extends PureComponent {

    static defaultProps = {
        results: {},
        updateSelection: () => { },
    }

    countResults() {
        const { results } = this.props;
        if (!results || !results.totalCountFiltered) return 0;
        return results.totalCountFiltered;
    }

    displayResults() {
        const { results, updateSelection } = this.props;
        let render = [];
        if (Object.keys(results).length > 0 && results.constructor === Object) {
            render = results.results.map((result, index) => {
                return (
                    <Grid.Column key={index}>
                        <ResultCard product={result} updateSelection={updateSelection} />
                    </Grid.Column>
                );
            })
        }
        return render;
    }

    render() {
        return (
            <>
                <Label content={`${this.countResults()} résultat(s)`} />
                <Grid columns={5} container stackable padded centered>
                    {this.displayResults()}
                </Grid>
            </>
        )
    }
}