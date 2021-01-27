import React, { PureComponent } from 'react';
import {
    Button,
    Container,
    Dropdown,
    Header,
    Image,
    Menu,
    Input,
    Icon,
    Label,
} from 'semantic-ui-react';

export default class SearchArea extends PureComponent {
    static defaultProps = {
        value: '',
        onChange: () => { },
    }

    state = {
        inputValue: '',
    }

    componentDidMount() {
        const { value } = this.props;
        this.setState({ inputValue: value });
    }

    updateInputValue(e) {
        this.setState({ inputValue: e.target.value });
    }

    submitOnKeyPress(e) {
        const { onChange } = this.props;
        const { inputValue } = this.state;
        if (e.key === 'Enter') {
            onChange({ inputValue });
        }
    }

    render() {
        const { inputValue } = this.state;
        const { onChange } = this.props;
        return (
            <Menu fixed='top' inverted>
                <Container>
                    <Menu.Item as='a' header>
                        {/* <Image size='mini' src='/logo.png' style={{ marginRight: '1.5em' }} /> */}
                        {'SAQ'}
                    </Menu.Item>
                    <Menu.Item>
                        <Input style={{ width: '300px' }}>
                            <input
                                defaultValue={inputValue}
                                value={inputValue}
                                onChange={(e) => { this.updateInputValue(e) }}
                                onKeyPress={(e) => this.submitOnKeyPress(e)}
                            />
                            <Button icon='search' onClick={() => onChange({ inputValue })}></Button>
                        </Input>
                    </Menu.Item>
                    <Menu.Item position={'right'}>
                        <Icon name={'filter'}>
                            <Label floating size={'tiny'} circular content={'1'} />
                        </Icon>
                    </Menu.Item>
                </Container>
            </Menu >
        );
    }
}