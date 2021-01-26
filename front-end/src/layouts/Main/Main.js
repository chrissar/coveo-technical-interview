import React, { PureComponent } from 'react';
import { Grid, Segment } from 'semantic-ui-react';
import Results from '../Results';

export default class Main extends PureComponent {
    render() {
        return (
            <Grid columns={2} container stackable centered>
                <Grid.Column width={4}></Grid.Column>
                <Grid.Column width={12}>
                    <Results/>
                </Grid.Column>
            </Grid>
        )
    }
}