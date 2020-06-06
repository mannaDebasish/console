import React, { Component } from 'react';
import { connect } from 'react-redux';
import 'materialize-css';
import './job.css';
import { i18n } from '../../constant/stages';
import { Row, Col, TextInput, Textarea, Icon, Button, DatePicker, Select } from 'react-materialize';
import DeleteIcon from '@material-ui/icons/Delete';
import SaveIcon from '@material-ui/icons/Save';
import CancelIcon from '@material-ui/icons/Cancel';
import EditIcon from '@material-ui/icons/Edit';
import AddIcon from '@material-ui/icons/Add';
import JobPage from './JobPage';
import { ListSubheader } from '@material-ui/core';
import Pdf from "react-to-pdf";
import blue from '@material-ui/core/colors/blue';

const ref = React.createRef();

class ExpensesTab extends Component {

    constructor(props) {
        super(props);
        this.state = {
            disableCreateExpenseButton: false,
            showSaveButton: false,
            toggleSaveEditCancel: [], //true for save edit, false for cancel
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
            ],
            disableExpenseDetails: [],
            contractors: [
                { name: 'Tony contractor', id: 'contractor 1' },
                { name: 'Steve contractor', id: 'contractor 2' },
                { name: 'Bucky contractor', id: 'contractor 3' },
                { name: 'Thor contractor', id: 'contractor 4' },
                { name: 'Natasha contractor', id: 'contractor 5' }
            ]
        }
        this.onInputChange = this.onInputChange.bind(this);
        this.addExpanses = this.addExpanses.bind(this);
    }

    componentWillMount() {
        console.log('expenses', this.state.expenses);
        console.log('expenses  length', this.state.expenses.length);
        this.setState({
            disableExpenseDetails: new Array(this.state.expenses.length).fill(true),
            toggleSaveEditCancel: new Array(this.state.expenses.length).fill(true)
        })
    }

    addExpanses() {
        const blankExpense = {
            contractorId: '',
            dateAssigned: '',
            amount: 0,
            completionDate: '',
            paidDate: '',
            note: ''
        }
        let expense = [blankExpense, ...this.state.expenses];
        this.setState({ 
            expenses: expense,
            toggleSaveEditCancel: Object.assign({}, this.state.toggleSaveEditCancel, { [0]: true }),
        });

    }
    

    deleteExpense = (index) => () => {
        this.state.expenses.splice(index, 1);
        this.setState({ expenses: this.state.expenses })
    }

    saveExpense = (index) => () => {
        this.setState({ 
            disableExpenseDetails: Object.assign({}, this.state.disableExpenseDetails, { [index]: true }),
            disableCreateExpenseButton: false 
        })

    }

    editExpense = (index) => () => {
        this.setState({ 
            disableExpenseDetails: Object.assign({}, this.state.disableExpenseDetails, { [index]: false }),
            toggleSaveEditCancel: Object.assign({}, this.state.toggleSaveEditCancel, { [index]: false }),
            disableCreateExpenseButton: true
        })   
    }

    cancelExpense = (index) => () => {
        var expenses = this.state.expenses.slice();
        expenses[index].contractorId = '';
        expenses[index].dateAssigned = '';
        expenses[index].amount = 0;
        expenses[index].completionDate = '';
        expenses[index].paidDate = '';
        expenses[index].note = ''
        console.log('cancelExpense ', expenses );
        this.setState({
            expenses
        })

    }

    onInputChange(e) {
        const { name, value, id } = e.target;
        console.log('name = ', name, 'value = ', value, 'id = ', id);
        var expenses = this.state.expenses.slice();
        console.log('shallow expenses = ', expenses[id][name]);
        expenses[id][name] = value;
        this.setState({ expenses });
        console.log('expenses = ', this.state.expenses);      
    }

    render() {
        const { expenses, showSaveButton, contractors } = this.state;
        console.log('expenses', expenses);
        console.log('disableExpenseDetails = ', this.state.disableExpenseDetails);
        return (
            <div className="expense-tab">
                <div className="expenses-head">Expenses</div>
                <div className="expanse-btn-list">                    
                    <Button
                        className="add-expanse-button"
                        node="button"
                        onClick={this.addExpanses}
                        style={{
                            marginRight: '5px'
                        }}
                        waves="light"
                        disabled={this.state.disableCreateExpenseButton}
                    >
                        CREATE EXPENSES
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
                                    {
                                        this.state.toggleSaveEditCancel[index] ?                                 
                                        <div className="delete-expense">
                                            <EditIcon style={{ color: blue[500] }} onClick={this.editExpense(index)}/>                                            
                                        </div> : 
                                        <div className="delete-expense">
                                            <SaveIcon style={{ color: blue[500] }} onClick={this.saveExpense(index)}/>
                                            <CancelIcon color="primary" onClick={this.cancelExpense(index)}/>
                                        </div>
                                    }
                                    <Row className="expense-row">
                                        <Col
                                            className="expense-label-col"
                                            s={3} >
                                            Contractor Name:
                                        </Col>
                                        <Col
                                            className="cost-col"
                                            s={9} >
                                            <Select
                                                id={index}
                                                placeholder="Contractor Id"
                                                name="contractorId"
                                                value={expense.contractorId ? expense.contractorId : ''}
                                                onChange={this.onInputChange}
                                                multiple={false}
                                                disabled={this.state.disableExpenseDetails[index]}
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

                                            >
                                                {
                                                    contractors.map((person, index) => {
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
                                                disabled={this.state.disableExpenseDetails[index]}
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
                                                disabled={this.state.disableExpenseDetails[index]}
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
                                                disabled={this.state.disableExpenseDetails[index]}
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
                                                disabled={this.state.disableExpenseDetails[index]}
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
                                            Notes:
                                        </Col>
                                        <Col
                                            className="cost-col"
                                            s={9} >
                                            <Textarea
                                                id={index}
                                                placeholder="Notes"
                                                name="note"
                                                value={expense.note ? expense.note : ''}
                                                onChange={this.onInputChange}
                                                disabled={this.state.disableExpenseDetails[index]}
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