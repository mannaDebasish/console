import React, { Component } from 'react';
import { connect } from 'react-redux';
import 'materialize-css';
import './job.css';
import { Row, Col, Card, Icon } from 'react-materialize';

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

                {/* <Row>
                    <Col m={12} s={12}>
                        <Card
                            className="darken-1"
                            closeIcon={<Icon>close</Icon>}
                            revealIcon={<Icon>more_vert</Icon>}
                            textClassName="black-text"
                            title="Card title"
                            actions={[
                                <h5>User name</h5>
                            ]}
                        >
                            I am a very simple card.
                        </Card>
                    </Col>
                </Row> */}
            </div>
        )
    }
}

const mapStateToProps = state => ({

});

const mapDispatchToProps = {

};

export default connect(mapStateToProps, mapDispatchToProps)(JobHeader);