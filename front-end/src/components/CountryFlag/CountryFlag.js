import React, { PureComponent } from 'react';
import Flag from 'react-world-flags';
import Countries from '../../utils/Countries';

export default class CountryFlag extends PureComponent {
    static defaultProps = {
        countryCode: "CA",
        height: "16",
    }

    render() {
        const { countryCode, height } = this.props;
        return <Flag code={countryCode} fallback={<span>uknown</span>} height={height} />
    }
}