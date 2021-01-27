import React, { PureComponent } from 'react';
import { Grid, Card, Icon, Image, Label, Rating } from 'semantic-ui-react'
import CountryFlag from '../CountryFlag';
import { Countries } from '../../utils';
let countriesUtils = new Countries();

export default class ResultCard extends PureComponent {
    static defaultProps = {
        product: undefined,
        updateSelection: () => { }
    }
    render() {
        const { product, updateSelection } = this.props;
        if (!product) { return null; }
        return (
            <Card fluid link onClick={() => updateSelection(product)}>
                <Image src={product.raw.tpthumbnailuri} wrapped ui={false} label={{
                    content: <CountryFlag height={'8'} countryCode={countriesUtils.getCountryCode(product.raw.tppays)} />,
                    ribbon: 'right',
                }} />
                <Card.Content>
                    <Card.Header>{product.title}</Card.Header>
                    <Card.Meta>
                        {/* <span className='date'>Joined in 2015</span> */}
                    </Card.Meta>
                    <Card.Description>
                        {/* Matthew is a musician living in Nashville. */}
                    </Card.Description>
                </Card.Content>
                <Card.Content extra textAlign="center">
                    <Label.Group color='black' size='mini'>
                        <Label>{product.raw.tpformat}</Label>
                        <Label>{product.raw.tppays}</Label>
                        <Label>{product.raw.tpcategorie}</Label>
                    </Label.Group>
                </Card.Content>
                <Card.Content extra>
                    <Grid columns={2} divided>
                        <Grid.Row>
                            <Grid.Column><Rating defaultRating={product.rating} maxRating={5} disabled /></Grid.Column>
                            <Grid.Column textAlign='right'><Label>{product.raw.tpprixnormal}</Label></Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Card.Content>
            </Card>
        )
    }
}