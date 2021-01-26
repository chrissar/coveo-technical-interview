import React, { PureComponent } from 'react';
import { Card, Icon, Image, Label } from 'semantic-ui-react'
import CountryFlag from '../CountryFlag';
import { Countries } from '../../utils';
let countriesUtils = new Countries();

export default class ResultCard extends PureComponent {
    static defaultProps = {
        product: undefined,
    }
    render() {
        const { product } = this.props;
        if (!product) { return null; }
        return (
            <Card fluid>
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
                <Card.Content extra>
                    {/* <Label icon='globe' size='tiny'>
                         <CountryFlag height={'8'} countryCode={countriesUtils.getCountryCode(product.raw.tppays)} />
                    </Label> */}
                </Card.Content>
            </Card>
        )
    }
}