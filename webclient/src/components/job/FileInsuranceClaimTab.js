import React, { Component } from 'react';
import { connect } from 'react-redux';
import 'materialize-css';
import './job.css';
import { i18n } from '../../constant/stages';
import { Row, Col, TextInput, Textarea, Icon, Button, DatePicker, Select, Badge } from 'react-materialize';
import moment from 'moment';
import { getAllSalesmen } from '../../actions/recordAction';

class FileInsuranceClaimTab extends Component {

    constructor(props) {
        super(props);
        this.state = {
            claimFiled: props.insurance && props.insurance.claimFiled ? true : false,
            insurance: props.insurance,
            salesPerson: props.salesmen,
            claimStatus: ''
        }
        this.onInputChange = this.onInputChange.bind(this);
        this.claimInsurance = this.claimInsurance.bind(this);
        this.onFileDateChange = this.onFileDateChange.bind(this);
    }

    componentDidMount() {
        this.props.getAllSalesmen();
    }

    componentWillReceiveProps(newProps) {
        if (this.state.salesPerson !== newProps.salesmen) {
            this.setState({ salesPerson: newProps.salesmen })
        };
    }

    claimInsurance() {
        this.setState({ insurance: Object.assign({}, this.state.insurance, { claimFiled: new Date().toLocaleString(), name: 'file insurance claim' }) }, () => {
            this.props.updateState(this.state.insurance);
            this.setState({ claimFiled: true });
        });

    }

    onFileDateChange(e) {
        this.setState({ insurance: Object.assign({}, this.state.insurance, { claimFileDate: moment(e).format("MM/DD/YYYY") }) });
    }

    onInputChange(e) {
        const { name, value } = e.target;
        this.setState({ insurance: Object.assign({}, this.state.insurance, { [name]: value }) });
    }

    render() {
        const { insurance, claimFiled, salesPerson } = this.state;
        return (
            <div className="file-ins-tab">
                {
                    claimFiled ?
                        <div className="file-ins-head">
                            Claimed insurance details
                        </div>
                        : <div className="file-ins-head">
                            Claim insurance
                            <Button
                                className="claim-status-button"
                                node="button"
                                style={{
                                    marginRight: '5px'
                                }}
                                waves="light"
                            >
                                CLAIM YET TO BE FILED
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
                                disabled={claimFiled}
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
                                <option key="default" value="">========= Select Salesmen =======</option>
                                {
                                    salesPerson.map((person, index) => {
                                        return (
                                            <option key={index} value={person.doc._id}>{person.doc.name}</option>
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
                                disabled={claimFiled}
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
                                disabled={claimFiled}
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
                                disabled={claimFiled}
                            />
                        </Col>
                    </Row>
                </div>
                <div className="file-ins-head">
                    {claimFiled ?
                        null :
                        <Button
                            className="mark-file-ins-button"
                            node="button"
                            onClick={this.claimInsurance}
                            style={{
                                marginRight: '5px'
                            }}
                            waves="light"
                        >
                            MARK INSURANCE CLAIM AS COMPLETE
                        </Button>
                    }
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    salesmen: state.records.salesmen
});

const mapDispatchToProps = {
    getAllSalesmen
};

export default connect(mapStateToProps, mapDispatchToProps)(FileInsuranceClaimTab);