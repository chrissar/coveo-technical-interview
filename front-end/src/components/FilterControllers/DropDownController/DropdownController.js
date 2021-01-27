import React, { PureComponent } from 'react';
import { Dropdown } from 'semantic-ui-react';

export default class DropdownController extends PureComponent {
    static defaultProps = {
        options: [
            {
                key: 0,
                text: 10,
                value: 10,
            },
            {
                key: 1,
                text: 25,
                value: 25,
            },
            {
                key: 2,
                text: 50,
                value: 50,
            },
            {
                key: 3,
                text: 100,
                value: 100,
            },
        ],
        compact: true,
        onChange: () => { },
    }

    updateValue(e, { value }) {
        const { onChange } = this.props;
        onChange(value);
    }

    render() {
        const { options, compact } = this.props;
        return (
            <Dropdown
                compact={compact}
                selection
                fluid
                options={options}
                defaultValue={options[0].value}
                onChange={(e, target) => this.updateValue(e, target)}
            />
        )
    }
}