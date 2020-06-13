import { Component } from 'react'
import { connect } from 'react-redux'
import * as h from 'react-hyperscript'
import hh from '../../hh'
const { div } = hh(h)

import 'materialize-css'
import './admin.css'
import { i18n } from '../../constant/stages'
import { Row, Col, TextInput, Textarea, Icon, Button, DatePicker, Select } from 'react-materialize'
import DeleteIcon from '@material-ui/icons/Delete'
import AddIcon from '@material-ui/icons/Add'
import { ListSubheader } from '@material-ui/core'
import * as pluralize from 'pluralize';
import RecordEditModal from '../modals/RecordEditModal';

export type JSON = { [k: string]: any };
interface AddRecordProps {
    recordType: string;
    schema: JSON[];
    getAllRecords: () => Promise<JSON[]>;
    createPost: (rec) => Promise<JSON>;
    updateRecord: (rec) => Promise<JSON>;
    customers: JSON[];
    getAllCustomers: () => Promise<JSON[]>;
}

interface AddRecordState {
    showAdd: boolean;
    newRecord: JSON;
    records: JSON[];
    allRecords: JSON[];
    selectedRecord: JSON;
    allCustomers: JSON[];
}


//TODO get rid of state and use redux instead. Convert to be a FunctionalComponent instead of a class component
export class AddRecordTab extends Component<AddRecordProps, AddRecordState> {
    constructor(props) {
        super(props)
        this.state = {
            showAdd: false,
            newRecord: {},
            records: props.records,
            allCustomers: props.customers ? props.customers : [],
            allRecords: props.records,
            selectedRecord: {}
        }
        this.onInputChange = this.onInputChange.bind(this)
        this.addRecord = this.addRecord.bind(this)
        this.handleSearchInputChange = this.handleSearchInputChange.bind(this)
        this.showAddSection = this.showAddSection.bind(this)
        this.hideAddSection = this.hideAddSection.bind(this);
        this.updateSelectedRecord = this.updateSelectedRecord.bind(this);
        this.onUpdateRecord = this.onUpdateRecord.bind(this);
    }

    componentDidMount() {
        this.props.getAllRecords().then(data => {
            if (data && data.length > 0) {
                this.setState({ records: data })
                this.setState({ allRecords: data })
            } else {
                //this.setState({ showAdd: true })
            }
        })
        if (this.props.recordType === 'job') {
            this.props.getAllCustomers().then(data => {
                if (data && data.length > 0) {
                    this.setState({ allCustomers: data })
                } else {
                    //this.setState({ showAdd: true })
                }
            })
        }
    }

    componentWillReceiveProps(newProps) {
        if (this.state.records !== newProps.records) {
            this.setState({ records: newProps.records })
            this.setState({ allRecords: newProps.records })
            if (newProps.records.length > 0) {
                this.setState({ showAdd: false })
            }
        }
        if (this.state.allCustomers !== newProps.customers) {
            this.setState({ allCustomers: newProps.customers })
        }
    }

    addRecord() {
        const _this = this;
        function validate(record) {
            for (let x of _this.props.schema) {
                if (!record[x.name]) {
                    return false
                }
            }
            return true
        }

        if (validate(this.state.newRecord)) {
            this.props.createPost(this.state.newRecord).then(data => {
            })
        } else {
            alert('Please enter all ' + this.props.recordType + 'details')
        }
    }
    showAddSection() {
        this.setState({ showAdd: true })
    }
    hideAddSection() {
        this.setState({ showAdd: false })
    }
    onInputChange(e) {
        const { name, value } = e.target
        this.setState({ newRecord: Object.assign({}, this.state.newRecord, { [name]: value }) })
    }
    handleSearchInputChange(e: Event) {
        const { value } = e.target as HTMLInputElement,
            _this = this;
        const updatedList = _this.state.allRecords.filter(function (item) {
            for (const x of _this.props.schema) {
                if (item.doc[x.name].toLowerCase().search(value.toLowerCase()) !== -1) {
                    return true
                }
            }
            return false
        })
        this.setState({ records: updatedList })
    }
    onSelectRecord(record) {
        this.setState({ selectedRecord: record })
    }
    updateSelectedRecord(name, value) {
        let data = this.state.selectedRecord;
        data[name] = value;
        this.setState({ selectedRecord: data })
    }
    onUpdateRecord() {
        this.props.updateRecord(this.state.selectedRecord).then((data) => {
            //this.getContractors();
        });
    }

    render() {
        const cssPrefix = 'customer'
        const { records, showAdd, selectedRecord, allCustomers } = this.state
        const rows = this.props.schema
        const self = this;
        const selectOptions = {
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
        }
        function getCustomerNameById(id) {
            console.log(555, allCustomers, id);
            return allCustomers.filter(customer => customer.doc._id === id).map(customer => customer.doc.name)[0];
        }
        function convertIdent(ident) {
            return ident
                .split('_')
                .map(x => x.charAt(0).toUpperCase() + x.slice(1))
                .join(' ')
        }
        function allCaps(str) {
            return str.trim().toUpperCase()
        }
        function capitalize(str) {
            const tstr = str.trim()
            return tstr.charAt(0).toUpperCase() + tstr.slice(1)
        }
        function capitalizePluralize(str) {
            return pluralize(capitalize(str))
        }

        function makeInputRow(obj, dataEntry, index) {
            return h(Row, { className: `${cssPrefix}-input-row`, key: `input-row-${index}` }, [h(Col, { className: `${cssPrefix}-input-label-col`, s: 3 }, [convertIdent(obj.name)]), h(Col, { className: 'cost-col', s: 9 }, [dataEntry])])
        }
        function makeDisplayRow(obj, data, index) {
            let currentData = data;
            if (self.props.recordType === 'job' && obj === 'customer') {
                currentData = getCustomerNameById(data);
                console.log(222, currentData);
            }
            return h(Row, { className: `${cssPrefix}-row`, key: `display-row-${index}` }, [h(Col, { className: `${cssPrefix}-label-col`, s: 3 }, [capitalize(self.props.recordType) + ' ' + convertIdent(obj)]), h(Col, { className: 'cost-col', s: 9 }, currentData)])
        }
        function makeAddButton(label, func) {
            return div({ className: 'add-btn-area' }, [
                h(
                    Button,
                    {
                        className: `add-${cssPrefix}-button`,
                        node: 'button',
                        onClick: func,
                        style: {
                            marginRight: '5px',
                        },
                        waves: 'light',
                        //}, [ label, h(Icon, { left: true, className: 'add-exp-btn-icon' }, [ h( AddIcon ) ] )]
                    }, [label, h(AddIcon, { style: { left: true } })]
                ),
            ])
        }
        function makeDeleteButton(label, func) {
            return div({ className: 'add-btn-area' }, [
                h(
                    Button,
                    {
                        className: `btn-delete delete-${cssPrefix}-button`,
                        node: 'button',
                        onClick: func,
                        style: {
                            marginRight: '5px',
                        },
                        waves: 'light',
                        //}, [ label, h(Icon, { left: true, className: 'add-exp-btn-icon' }, [ h( AddIcon ) ] )]
                    }, [label, h(DeleteIcon, { style: { left: true } })]
                ),
            ])
        }
        function inputType(obj) {
            if (obj['type'] === 'Textarea') {
                return Textarea
            }
            if (obj['type'] === 'Dropdown') {
                return Select
            }
            return TextInput
        }
        function getModal(record, obj, index) {
            return div({ className: 'edit-item', onClick: () => self.onSelectRecord(record) },
                h(
                    RecordEditModal,
                    {
                        index: index,
                        record: selectedRecord,
                        rows: obj,
                        updateSelectedRecord: self.updateSelectedRecord,
                        onUpdateRecord: self.onUpdateRecord,
                        recordType: self.props.recordType,
                        closeAfterTransition: false
                    }
                ),
            )
        }
        return div({ className: `${cssPrefix}-tab` }, [
            div({ className: `${cssPrefix}-top` }, [
                div({ className: 'search-area' }, [
                    h(TextInput, {
                        icon: 'search',
                        label: 'Search ' + capitalizePluralize(this.props.recordType),
                        className: `search-${cssPrefix}-input`,
                        onChange: this.handleSearchInputChange,
                    }),
                ]),
                !showAdd ? makeAddButton('ADD ' + allCaps(this.props.recordType), this.showAddSection) : makeDeleteButton('DELETE ' + allCaps(this.props.recordType), this.hideAddSection),
            ]),
            (showAdd
                ? div({ className: `add-${cssPrefix}-area` }, [
                    ...rows.map((obj, index) => {
                        if (obj.type === 'Dropdown' && this.props.recordType === 'job') {
                            return makeInputRow(obj, h(inputType(obj), { placeholder: convertIdent(obj.name), name: obj.name, multiple: false, value: '', options: selectOptions, onChange: this.onInputChange, onBlur: this.onInputChange },
                                [
                                    h('option', { value: '', key: 'default-option' }, 'Select Customer'),
                                    allCustomers.map((customer, index) => {
                                        return h('option', { value: customer.doc._id, key: index }, customer.doc.name);
                                    })
                                ]), index)
                        } else {
                            return makeInputRow(obj, h(inputType(obj), { placeholder: convertIdent(obj.name), name: obj.name, onChange: this.onInputChange, onBlur: this.onInputChange }), index)
                        }
                    }),
                    makeAddButton('SAVE  ' + allCaps(this.props.recordType), this.addRecord),
                ])
                : null),
            div(
                { className: `${cssPrefix}-list` },
                this.state.records.map((record, index) => {
                    return div(
                        { className: `${cssPrefix}-item`, key: `display-parent-${index}` }, [
                        div(
                            { className: `${cssPrefix}-item-edit`, key: `link-child-${index}` },
                            self.props.recordType !== 'job' ? getModal(record.doc, rows, index) : null
                        ),
                        div(
                            { className: `${cssPrefix}-row-item`, key: `display-child-${index}` },
                            rows.map(obj => {
                                return makeDisplayRow(obj.label, record.doc[obj.name], index)
                            }),
                        )
                    ])
                }),
            ),
        ])
    }
}
