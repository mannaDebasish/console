import React, { Component } from 'react';
import { connect } from 'react-redux';
import 'materialize-css';
import './job.css';
import { i18n } from '../../constant/stages';
import { Row, Col, TextInput, Textarea, Icon, Button, DatePicker } from 'react-materialize';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import JobPage from './JobPage';
import { ListSubheader } from '@material-ui/core';
import Pdf from "react-to-pdf";

const ref = React.createRef();

class ExpensesTab extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showSaveButton: false,
            expenses: [
                {
                    contractorId: 'contractor 1',
                    dateAssigned: 'May 08, 2020',
                    amount: 50,
                    completionDate: 'May 09, 2020',
                    paidDate: 'May 09, 2020',
                    note: 'Paid by credit card',
                },
                {
                    contractorId: 'contractor 2',
                    dateAssigned: 'May 10, 2020',
                    amount: 100,
                    completionDate: 'May 10, 2020',
                    paidDate: 'May 10, 2020',
                    note: 'Paid by credit card'
                }
            ]
        }
        this.onInputChange = this.onInputChange.bind(this);
        this.addExpanses = this.addExpanses.bind(this);
        this.saveExpanses = this.saveExpanses.bind(this);

    }
    addExpanses() {
        const blankExpanse = {
            contractorId: '',
            dateAssigned: '',
            amount: 0,
            completionDate: '',
            paidDate: '',
            note: ''
        }
        let expanse = [blankExpanse, ...this.state.expenses];
        this.setState({ expenses: expanse, showSaveButton: true });

    }
    saveExpanses() {
        this.setState({ showSaveButton: false });
    }
    deleteExpense = (index) => () => {
        this.state.expenses.splice(index, 1);
        this.setState({ expenses: this.state.expenses })
    }
    onInputChange(e) {
        const { name, value } = e.target;
        this.setState({ expense: Object.assign({}, this.state.expenses, { [name]: value }) });
    }

    render() {
        const { expenses, showSaveButton } = this.state;
        return (
            <div className="expense-tab">
                <div className="expenses-head">Expenses</div>
                <div className="expanse-btn-list">
                    {
                        showSaveButton ?
                            <Button
                                className="save-expanse-button"
                                node="button"
                                onClick={this.saveExpanses}
                                style={{
                                    marginRight: '5px'
                                }}
                                waves="light"
                            >
                                SAVE
                            </Button> : null
                    }

                    <Button
                        className="add-expanse-button"
                        node="button"
                        onClick={this.addExpanses}
                        style={{
                            marginRight: '5px'
                        }}
                        waves="light"
                    >
                        CREATE EXPANSES
                            <Icon left className="add-exp-btn-icon">
                            <AddIcon />
                        </Icon>
                    </Button>
                </div>
                <div className="expenses-body">
                    {
                        expenses.map((expense, index) => {
                            return (
                                <div className="expense-item" key={index}>
                                    <div className="delete-expense" onClick={this.deleteExpense(index)}>
                                        <DeleteIcon />
                                    </div>
                                    <Row className="expense-row">
                                        <Col
                                            className="expense-label-col"
                                            s={3} >
                                            Contractor Id:
                                        </Col>
                                        <Col
                                            className="cost-col"
                                            s={9} >
                                            <TextInput
                                                id={index}
                                                placeholder="Contractor Id"
                                                name="contractorId"
                                                value={expense.contractorId ? expense.contractorId : ''}
                                                onChange={this.onInputChange}
                                            />
                                        </Col>
                                    </Row>
                                    <Row className="expense-row">
                                        <Col
                                            className="expense-label-col"
                                            s={3} >
                                            Date Assigned:
                                        </Col>
                                        <Col
                                            className="cost-col"
                                            s={9} >
                                            <DatePicker
                                                id={index}
                                                name="dateAssigned"
                                                onChange={this.onInputChange}
                                                placeholder="Date Assigned"
                                                value={expense.dateAssigned ? expense.dateAssigned : ""}
                                                options={{
                                                    autoClose: false,
                                                    container: null,
                                                    setDefaultDate: true,
                                                    defaultDate: expense.dateAssigned ? expense.dateAssigned : null,
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
                                            Amount:
                                        </Col>
                                        <Col
                                            className="cost-col"
                                            s={9} >
                                            <span><b> $</b></span>
                                            <TextInput
                                                id={index}
                                                placeholder="Amount"
                                                name="amount"
                                                value={expense.amount ? expense.amount : ''}
                                                onChange={this.onInputChange}
                                            />
                                        </Col>
                                    </Row>
                                    <Row className="expense-row">
                                        <Col
                                            className="expense-label-col"
                                            s={3} >
                                            Completion Date:
                                        </Col>
                                        <Col
                                            className="cost-col"
                                            s={9} >
                                            <DatePicker
                                                id={index}
                                                name="completionDate"
                                                onChange={this.onInputChange}
                                                placeholder="Completion Date"
                                                value={expense.completionDate ? expense.completionDate : ""}
                                                options={{
                                                    autoClose: false,
                                                    container: null,
                                                    setDefaultDate: true,
                                                    defaultDate: expense.completionDate ? expense.completionDate : "",
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
                                            Paid Date:
                                        </Col>
                                        <Col
                                            className="cost-col"
                                            s={9} >
                                            <DatePicker
                                                id={index}
                                                name="paidDate"
                                                onChange={this.onInputChange}
                                                placeholder="Paid Date"
                                                value={expense.paidDate ? expense.paidDate : ""}
                                                options={{
                                                    autoClose: false,
                                                    container: null,
                                                    setDefaultDate: true,
                                                    defaultDate: expense.paidDate ? expense.paidDate : "",
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
                                            Note:
                                        </Col>
                                        <Col
                                            className="cost-col"
                                            s={9} >
                                            <Textarea
                                                id={index}
                                                placeholder="Note"
                                                name="note"
                                                value={expense.note ? expense.note : ''}
                                                onChange={this.onInputChange}
                                                l={12}
                                                m={12}
                                                s={12}
                                                xl={12}
                                            />
                                        </Col>
                                    </Row>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({

});

const mapDispatchToProps = {

};

export default connect(mapStateToProps, mapDispatchToProps)(ExpensesTab);