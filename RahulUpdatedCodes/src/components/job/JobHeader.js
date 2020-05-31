import React, { Component } from 'react';
import { connect } from 'react-redux';
import 'materialize-css';
import './job.css';
import { Row, Col, Card, Icon } from 'react-materialize';
import JobPage from './JobPage';

class JobHeader extends Component {

    constructor(props) {
        super(props);
        this.state = {

        }

    }


    render() {
        return (
            <div className="job-header">
                <div className="user-name">
                    <h3>User Name</h3>
                </div>
                <div className="header-body">
                    <Row>
                        <Col m={6}>
                            <p><b>Address:</b></p>
                            <p>205, M89, Shapoorji Housing Complex, Kolkata 7007135</p>
                        </Col>
                        <Col m={3}>
                            <p><b>Recently Completed:</b></p>
                            <p>FE Inspection On: 04/27/2020</p>
                        </Col>
                        <Col m={3}>
                            <p><b>Next Up:</b></p>
                            <p>ICA</p>
                        </Col>
                    </Row>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({

});

const mapDispatchToProps = {

};

export default connect(mapStateToProps, mapDispatchToProps)(JobHeader);