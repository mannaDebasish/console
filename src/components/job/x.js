import React, { Component } from 'react';
import { connect } from 'react-redux';
import 'materialize-css';
import './job.css';
import { i18n } from '../../constant/stages';
import { Row, Col, TextInput, Textarea, Icon, Button, DatePicker, Select } from 'react-materialize';
import moment from 'moment';

class FileInsuranceClaimTab extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isClaimed: false,
            insurance:
            {

            },
            salesPerson: [
                { name: 'Sales person 1', id: 'Sales person 1' },
                { name: 'Sales person 2', id: 'Sales person 2' },
                { name: 'Sales person 3', id: 'Sales person 3' },
                { name: 'Sales person 4', id: 'Sales person 4' },
                { name: 'Sales person 5', id: 'Sales person 5' }
            ]
        }
        this.onInputChange = this.onInputChange.bind(this);
        this.onFileDateChange = this.onFileDateChange.bind(this);
        this.claimInsurance = this.claimInsurance.bind(this);

    }

    claimInsurance() {
        this.setState({ isClaimed: true });
    }

    onFileDateChange(e) {
        this.setState({ insurance: Object.assign({}, this.state.insurance, { claimFileDate: moment(e).format("MMM Do YY") }) });
    }

    onInputChange(e) {
        const { name, value } = e.target;
        this.setState({ insurance: Object.assign({}, this.state.insurance, { [name]: value }) });
    }

    render() {
        const { insurance, isClaimed, salesPerson } = this.state;
        return (
            <div className="file-ins-tab">
                {
                    isClaimed ?
                        <div className="file-ins-head">Claimed insurance details</div>
                        : <div className="file-ins-head">
                            Claim insurance
                            <Button
                                className="save-file-ins-button"
                                node="button"
                                onClick={this.claimInsurance}
                                style={{
                                    marginRight: '5px'
                                }}
                                waves="light"
                            >
                                SAVE
                            </Button>
                        </div>
                }
                <div className="file-ins-body">
                    <Row className="expense-row">
                        <Col
                            className="expense-label-col"
                            s={3} >
                            Sales Person:
                                        </Col>
                        <Col
                            className="cost-col"
                            s={9} >
                            <Select
                                id="Select-9"
                                placeholder="Sales Person"
                                name="salesPerson"
                                multiple={false}
                                onChange={this.onInputChange}
                                disabled={isClaimed}
                                options={{
                                    classes: '',
                                    dropdownOptions: {
                                        alignment: 'left',
                                        autoTrigger: true,
                                        closeOnClick: true,
                                        constrainWidth: true,
                                        coverTrigger: true,
                                        hover: false,
                                        inDuration: 150,
                                        onCloseEnd: null,
                                        onCloseStart: null,
                                        onOpenEnd: null,
                                        onOpenStart: null,
                                        outDuration: 250
                                    }
                                }}
                                value={insurance.salesPerson ? insurance.salesPerson : ''}
                            >
                                {
                                    salesPerson.map((person, index) => {
                                        return (
                                            <option key={index} value={person.id}>{person.name}</option>
                                        )
                                    })
                                }
                            </Select>
                        </Col>
                    </Row>
                    <Row className="expense-row">
                        <Col
                            className="expense-label-col"
                            s={3} >
                            Carrier:
                                        </Col>
                        <Col
                            className="cost-col"
                            s={9} >
                            <TextInput
                                placeholder="Carrier"
                                name="carrier"
                                value={insurance.carrier ? insurance.carrier : ''}
                                onChange={this.onInputChange}
                                disabled={isClaimed}
                            />
                        </Col>
                    </Row>
                    <Row className="expense-row">
                        <Col
                            className="expense-label-col"
                            s={3} >
                            Claim File Date:
                                        </Col>
                        <Col
                            className="cost-col"
                            s={9} >
                            <DatePicker
                                name="claimFileDate"
                                onChange={this.onFileDateChange}
                                placeholder="Claim File Date"
                                value={insurance.claimFileDate ? insurance.claimFileDate : ""}
                                disabled={isClaimed}
                                options={{
                                    autoClose: false,
                                    container: null,
                                    setDefaultDate: true,
                                    defaultDate: insurance.claimFileDate ? insurance.claimFileDate : null,
                                    disableDayFn: null,
                                    disableWeekends: false,
                                    events: [],
                                    firstDay: 0,
                                    format: 'mmm dd, yyyy',
                                    i18n: {
                                        i18n
                                    },
                                    isRTL: false,
                                    maxDate: null,
                                    minDate: null,
                                    onClose: null,
                                    onDraw: null,
                                    onOpen: null,
                                    onSelect: null,
                                    parse: null,
                                    showClearBtn: false,
                                    showDaysInNextAndPreviousMonths: false,
                                    showMonthAfterYear: false,
                                    yearRange: 10
                                }}
                            />
                        </Col>
                    </Row>
                    <Row className="expense-row">
                        <Col
                            className="expense-label-col"
                            s={3} >
                            Claim Number:
                                        </Col>
                        <Col
                            className="cost-col"
                            s={9} >
                            <TextInput
                                placeholder="Claim Number"
                                name="claimNumber"
                                value={insurance.claimNumber ? insurance.claimNumber : ''}
                                onChange={this.onInputChange}
                                disabled={isClaimed}
                            />
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

export default connect(mapStateToProps, mapDispatchToProps)(FileInsuranceClaimTab);