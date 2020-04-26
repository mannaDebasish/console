import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
//import 'materialize-css';
import './job.css';
import { Col, Nav, Row, Tab } from 'react-bootstrap';
import JobHeader from './JobHeader';
import Postform from '../Postform';
class JobPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tabKey: 'first'
        }
        this.handleTabSelect = this.handleTabSelect.bind(this);

    }
    handleTabSelect(tabKey) {
        this.setState({ tabKey })
    }

    render() {
        const { tabKey } = this.state;
        console.log(111, tabKey);
        return (
            <div className="job-page">

                <JobHeader />


                <Tab.Container id="left-tabs-example" defaultActiveKey={tabKey} activeKey={tabKey} onSelect={this.handleTabSelect}>
                    <Row>
                        <Col sm={3}>
                            <Nav variant="pills" className="flex-column">
                                <Nav.Item>
                                    <Nav.Link eventKey="first">Tab 1</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey="second">Tab 2</Nav.Link>
                                </Nav.Item>
                            </Nav>
                        </Col>
                        <Col sm={9}>
                            <Tab.Content>
                                <Tab.Pane eventKey="first">
                                    test 1
                                </Tab.Pane>
                                <Tab.Pane eventKey="second">
                                    test 2
                                </Tab.Pane>
                            </Tab.Content>
                        </Col>
                    </Row>
                </Tab.Container>
            </div>
        )
    }
}

const mapStateToProps = state => ({

});

const mapDispatchToProps = {

};

export default connect(mapStateToProps, mapDispatchToProps)(JobPage);