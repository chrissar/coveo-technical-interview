import React, { PureComponent } from 'react';
import { Grid, Modal, Segment, Header, Image, Button } from 'semantic-ui-react';
import { SearchArea, Results } from '..';
import { CountryFlag } from '../../components';
import Countries from '../../utils/Countries';
import QueryController from '../../controllers/QueryController/QueryController';
import './styles.css';

let countriesUtils = new Countries();
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
    }

    async componentDidMount() {
        await this.buildQuery();
        await this.renderResults();
    }

    async buildQuery() {
        const { firstResult, numberOfResults, q } = this.state;
        const query = { firstResult, numberOfResults, q };
        this.setState((state) => ({ query: query }));
    }

    async updateQuery(query) {
        this.setState((state) => ({ q: query.inputValue }));
        await this.buildQuery();
        await this.renderResults();
    }

    async renderResults() {
        const { query } = this.state;
        let items;
        try {
            items = await queryController.get(query);
        } catch (e) {
            console.log(e);
        }
        this.setState({ items });
    }

    toggleModal(open) {
        this.setState({ modalOpen: open });
    }

    setItem(selected) {
        this.setState({ selectedItem: selected, modalOpen: true });
    }

    populateModal(item) {
        if (Object.keys(item).length > 0) {
            return (<>
                {/* <Modal.Header>{item.title}</Modal.Header> */}
                <Modal.Content scrolling>
                    {/* <Image size='medium' src={item.raw.tpthumbnailuri} wrapped /> */}
                    <Modal.Description>
                        {/* <Header sub><CountryFlag countryCode={countriesUtils.getCountryCode(item.raw.tppays)} /> {item.raw.tpregion}, {item.raw.tppays}</Header> */}
                        <div dangerouslySetInnerHTML={{ __html: item.raw.tppagebody }}></div>
                    </Modal.Description>
                </Modal.Content>
                <Modal.Actions>
                    <Button color='black' onClick={() => this.toggleModal(false)}>
                        Nope
</Button>
                    <Button
                        content="Yep, that's me"
                        labelPosition='right'
                        icon='checkmark'
                        onClick={() => this.toggleModal(false)}
                        positive
                    />
                </Modal.Actions>
            </>);
        } else {
            return (
                <>
                    <Modal.Header>Rien à montrer.</Modal.Header>
                    <Modal.Content image>
                        <Image size='medium' src='https://via.placeholder.com/150' wrapped />
                        <Modal.Description>
                            <Header>Default Profile Image</Header>
                            <p>
                                We've found the following gravatar image associated with your e-mail
                                address.
  </p>
                            <p>Is it okay to use this photo?</p>
                        </Modal.Description>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button color='black' onClick={() => this.toggleModal(false)}>
                            Nope
</Button>
                        <Button
                            content="Yep, that's me"
                            labelPosition='right'
                            icon='checkmark'
                            onClick={() => this.toggleModal(false)}
                            positive
                        />
                    </Modal.Actions>
                </>
            )
        }
    }

    render() {
        const { items, q, modalOpen, selectedItem } = this.state;
        return (
            <>
                <SearchArea value={q} onChange={(query) => this.updateQuery(query)} />
                <Grid columns={1} container stackable centered className={'results'}>
                    <Results results={items} updateSelection={(item) => { this.setItem(item) }} />
                </Grid>
                <Modal
                    onClose={() => this.toggleModal(false)}
                    onOpen={() => this.toggleModal(true)}
                    open={modalOpen}
                >
                    {this.populateModal(selectedItem)}
                </Modal>
            </>
        )
    }
}