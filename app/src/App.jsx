import React from 'react';
import axios from "axios"
import {
    Button, Col,
    Container,
    Input,
    InputGroup,
    InputGroupAddon,
    Nav,
    Navbar,
    NavbarBrand,
    NavItem,
    NavLink,
    Row
} from "reactstrap";

class App extends React.Component {
    state = {
        "hotels": [],
        defaultTitle: 'Faster way to find availability of your favourite hotels'
    }

    search = () => {
        let searchTerm = axios.get(`http://localhost:9000/find`)
            .then(res => {
                const hotels = res.data;

                this.setState({ hotels });
            })
    }
    render() {
        return (
            <Container>
                {/*Navigation*/}
                <Row>
                    <Col sm="12">
                        <Navbar color="light" light expand="md">
                            <NavbarBrand href="/">Search Hotels</NavbarBrand>
                            <Nav className="ml-auto" navbar>
                                <NavItem>
                                    <NavLink href="#">
                                        {this.state.searchTerm}
                                    </NavLink>
                                </NavItem>
                            </Nav>
                        </Navbar>
                    </Col>
                </Row>

                {/*Search field and button*/}
                <Row className="search">
                    <Col sm="12">
                        <InputGroup>
                            <Input placeholder="Find hotels" />
                            <InputGroupAddon addonType="prepend">
                                <Button color="success"
                                    className="search-button" onClick={this.search.bind(this)}>
                                    Search
                                </Button>
                            </InputGroupAddon>
                        </InputGroup>
                    </Col>
                </Row>

                {/*The fetched list of movies*/}
                <Row className="content">
                    {
                        this.state.hotels.map(hotel =>
                            <Col xs="6" sm="4"
                                key={hotel.id}
                                className="movie">
                                <Hotel hotel={hotel} />
                            </Col>
                        )
                    }
                </Row>
            </Container>
        );
    }
};

export default App;