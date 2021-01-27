import React, { PureComponent } from 'react';
import { Dropdown } from 'semantic-ui-react';

export default class DropdownController extends PureComponent {
    static defaultProps = {
        options: [
            {
                key: 0,
                text: 12,
                value: 12,
            },
            {
                key: 1,
                text: 24,
                value: 24,
            },
        ],
        compact: true,
        onChange: () => { },
    }

    updateValue(e, { value }) {
        const {onChange} = this.props;
        onChange(value);
    }

    render() {
        const { options, compact } = this.props;
        return (
            <Dropdown
                compact={compact}
                selection
                options={options}
                defaultValue={options[0].value}
                onChange={(e, target) => this.updateValue(e, target)}
            />
        )
    }
}