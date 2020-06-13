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
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Tooltip from '@material-ui/core/Tooltip';
import moment from 'moment';
import { getAllContractors } from '../../actions/recordAction';
import { v4 as uuidv4 } from 'uuid';

const ref = React.createRef();

class ExpensesTab extends Component {

    constructor(props) {
        super(props);
        this.state = {
            disableCreateExpenseButton: false,
            showSaveButton: false,
            toggleSaveEditCancel: [], //true for save edit, false for cancel
            expenses: props.expenses,
            disableExpenseDetails: [],
            contractors: props.contractors
        }
        this.onInputChange = this.onInputChange.bind(this);
        this.addExpanses = this.addExpanses.bind(this);
        this.onDateChange = this.onDateChange.bind(this);
    }

    componentWillMount() {
        if (this.state.expenses && this.state.expenses.length > 0) {
            this.setState({
                disableExpenseDetails: new Array(this.state.expenses.length).fill(true),
                toggleSaveEditCancel: new Array(this.state.expenses.length).fill(true)
            })
        }
    }
    componentDidMount() {
        this.props.getAllContractors();
    }

    componentWillReceiveProps(newProps) {
        if (this.state.contractors !== newProps.contractors) {
            this.setState({ contractors: newProps.contractors })
        };
    }

    addExpanses() {
        const blankExpense = {
            id: uuidv4(),
            contractorId: '',
            dateAssigned: '',
            amount: 0,
            completionDate: '',
            paidDate: '',
            note: ''
        }
        let expense = [];
        if (this.state.expenses && this.state.expenses.length === 0) {
            expense = expense.push(blankExpense);
        } else {
            expense = [blankExpense, ...this.state.expenses];
        }
        this.setState({ expenses: expense }, () => {
            this.setState({
                toggleSaveEditCancel: Object.assign({}, this.state.toggleSaveEditCancel, { [0]: false }),
                disableExpenseDetails: Object.assign({}, this.state.disableExpenseDetails, { [0]: false })
            });
        });

    }


    deleteExpense = (index) => () => {
        this.state.expenses.splice(index, 1);
        this.setState({ expenses: this.state.expenses })
    }

    saveExpense = (index) => () => {
        if (this.state.expenses[index]
            && this.state.expenses[index].contractorId && this.state.expenses[index].contractorId !== ''
            && this.state.expenses[index].dateAssigned && this.state.expenses[index].dateAssigned !== ''
            && this.state.expenses[index].completionDate && this.state.expenses[index].completionDate !== ''
            && this.state.expenses[index].amount && this.state.expenses[index].amount !== ''
            && this.state.expenses[index].paidDate && this.state.expenses[index].paidDate !== ''
        ) {
            this.props.updateExpenses(this.state.expenses);
            this.setState({
                disableExpenseDetails: Object.assign({}, this.state.disableExpenseDetails, { [index]: true }),
                toggleSaveEditCancel: Object.assign({}, this.state.toggleSaveEditCancel, { [index]: true }),
                disableCreateExpenseButton: false
            })
        } else {
            alert("Please fill out all the fields");
        }

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
        this.setState({
            expenses,
            toggleSaveEditCancel: Object.assign({}, this.state.toggleSaveEditCancel, { [index]: true }),
            disableCreateExpenseButton: false
        })

    }

    onInputChange(e) {
        const { name, value, id } = e.target;
        var expenses = this.state.expenses.slice();
        expenses[id][name] = value;
        this.setState({ expenses });
    }

    onDateChange = (e, name, id) => {
        const dateObj = e.target.dataset;
        const date = `${dateObj.month}/${dateObj.day}/${dateObj.year}`;
        var expenses = this.state.expenses.slice();
        expenses[id][name] = date;
        this.setState({ expenses });
    }

    render() {
        const { expenses, showSaveButton, contractors } = this.state;
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
                    {expenses && expenses.length > 0 ?
                        expenses.map((expense, index) => {
                            return (
                                <div className="expense-item" key={index}>
                                    {
                                        this.state.toggleSaveEditCancel[index] ?
                                            <div className="edit-expense">
                                                <FontAwesomeIcon icon={faEdit} size='2x' style={{ color: blue[500] }} onClick={this.editExpense(index)} title="Edit" />
                                            </div> :
                                            <div className="save-edit-expense">
                                                <Tooltip title="Save">
                                                    <SaveIcon fontSize='2px' style={{ color: blue[500] }} onClick={this.saveExpense(index)} />
                                                </Tooltip>
                                                <Tooltip title="Cancel">
                                                    <CancelIcon color="primary" onClick={this.cancelExpense(index)} />
                                                </Tooltip>
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
                                                <option key="default" value="">========= Select Contractor =======</option>
                                                {
                                                    contractors.map((person, index) => {
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
                                            Date Assigned:
                                        </Col>
                                        <Col
                                            className="cost-col"
                                            s={9} >
                                            <DatePicker
                                                id={index}
                                                name="dateAssigned"
                                                onChange={() => this.onDateChange(event, 'dateAssigned', index)}
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
                                                    yearRange: 10,
                                                    preventScrolling: true
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
                                                onChange={() => this.onDateChange(event, 'completionDate', index)}
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
                                                onChange={() => this.onDateChange(event, 'paidDate', index)}
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
                        }) : null
                    }
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    contractors: state.records.contractors
});

const mapDispatchToProps = {
    getAllContractors
};

export default connect(mapStateToProps, mapDispatchToProps)(ExpensesTab);


// <EditIcon style={{ color: blue[500] }} onClick={this.editExpense(index)}/> 