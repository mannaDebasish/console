import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import * as h from 'react-hyperscript'
import hh from '../../hh'
const { div, p } = hh(h)

//import 'materialize-css';
import './admin.css'
import { makeStyles } from '@material-ui/core/styles'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import Header from '../header/Header'
import { AddRecordTab } from './AddRecordTab'

import {
    getAllCustomers, createCustomerPost, updateContractor,
    getAllContractors, createContractorPost, updateCustomer,
    getAllSalesmen, createSalesmanPost, updateSalesmen,
    getAllInsurers, createInsurerPost, updateInsure,
    getAllJobs, createJobPost
} from '../../actions/recordAction'

const customer_schema = [
    { name: 'name', label: 'Customer Name' },
    { name: 'phone', label: 'Phone Number' },
    { name: 'email', label: 'Email' },
    { name: 'address', label: 'Address', type: 'Textarea' },
    { name: 'bank_name', label: 'Bank Name' },
    { name: 'bank_account#', label: 'Bank Account#' },
    { name: 'bank_routing#', label: 'Bank Routing#' },
]

const contractor_schema = [
    { name: 'name', label: 'Contractor Name' },
    { name: 'phone', label: 'Phone Number' },
    { name: 'email', label: 'Email' },
    { name: 'company_name', label: 'Company Name' },
    { name: 'company_address', label: 'Company Address', type: 'Textarea' },
    { name: 'EIN', label: 'EIN' },
    { name: 'bank_name', label: 'Bank Name' },
    { name: 'bank_account#', label: 'Bank Account#' },
    { name: 'bank_routing#', label: 'Bank Routing#' },
]

const insurer_schema = [
    { name: 'name', label: 'Adjustor Name' },
    { name: 'phone', label: 'Phone Number' },
    { name: 'email', label: 'Email' },
    { name: 'company_name', label: 'Company Name' },
    { name: 'company_address', label: 'Company Address', type: 'Textarea' },
]

const salesman_schema = [
    { name: 'name', label: 'Name' },
    { name: 'phone', label: 'Phone Number' },
    { name: 'email', label: 'Email' },
    { name: 'address', label: 'Address', type: 'Textarea' },
    { name: 'bank_name', label: 'Bank Name' },
    { name: 'bank_account#', label: 'Bank Account#' },
    { name: 'bank_routing#', label: 'Bank Routing#' },
]
const job_schema = [
    { name: 'name', label: 'Name' },
    { name: 'customer_ref_id', label: 'customer', type: 'Dropdown' }
]

const AddCustomerTab = connect(state => ({ records: state.records.customers, schema: customer_schema, recordType: 'customer' }), { getAllRecords: getAllCustomers, createPost: createCustomerPost, updateRecord: updateCustomer })(AddRecordTab)
const AddContractorTab = connect(state => ({ records: state.records.contractors, schema: contractor_schema, recordType: 'contractor' }), { getAllRecords: getAllContractors, createPost: createContractorPost, updateRecord: updateContractor })(AddRecordTab)
const AddSalesmanTab = connect(state => ({ records: state.records.salesmen, schema: salesman_schema, recordType: 'salesman' }), { getAllRecords: getAllSalesmen, createPost: createSalesmanPost, updateRecord: updateSalesmen })(AddRecordTab)
const AddInsurerTab = connect(state => ({ records: state.records.insurers, schema: insurer_schema, recordType: 'insurer' }), { getAllRecords: getAllInsurers, createPost: createInsurerPost, updateRecord: updateInsure })(AddRecordTab)
const AddJobTab = connect(state => ({ records: state.records.jobs, customers: state.records.customers, schema: job_schema, recordType: 'job' }), { getAllRecords: getAllJobs, createPost: createJobPost, getAllCustomers: getAllCustomers })(AddRecordTab)

function TabPanel(props) {
    const { children, value, index, ...other } = props

    return (
        <Typography component="div" role="tabpanel" hidden={value !== index} id={`vertical-tabpanel-${index}`} aria-labelledby={`vertical-tab-${index}`} {...other}>
            {value === index && <Box p={3}>{children}</Box>}
        </Typography>
    )
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
}

function a11yProps(index) {
    return {
        id: `vertical-tab-${index}`,
        'aria-controls': `vertical-tabpanel-${index}`,
    }
}

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
        display: 'flex',
    },
    tabs: {
        borderRight: `1px solid ${theme.palette.divider}`,
    },
}))

function AdminPage() {
    const classes = useStyles()
    const [value, setValue] = React.useState(0)

    const handleChange = (event, newValue) => {
        setValue(newValue)
    }

    const adminTab = [
        { label: 'PAY EXPENSES', component: () => p('PAY EXPENSES') },
        { label: 'MANAGE CUSTOMER', component: AddCustomerTab },
        { label: 'MANAGE CONTRACTOR', component: AddContractorTab },
        { label: 'MANAGE SALESMAN', component: AddSalesmanTab },
        { label: 'MANAGE INSURERS', component: AddInsurerTab },
        { label: 'Add NEW JOB', component: AddJobTab },
    ]

    return div({ className: 'admin-page' }, [
        h(Header),
        div({ className: classes.root + ' admin-tab-container' }, [
            h(
                Tabs,
                {
                    orientation: 'vertical',
                    variant: 'scrollable',
                    value: value,
                    onChange: handleChange,
                    'aria-label': 'Vertical tabs example',
                    className: classes.tabs + ' tab-links',
                },
                adminTab.map((obj, index) => {
                    return h(Tab, { key: index, label: obj.label, ...a11yProps(index) })
                }),
            ),

            div(
                { className: 'tab-contents' },
                adminTab.map((obj, index) => {
                    return h(TabPanel, { value: value, index: index }, [h(obj.component)])
                }),
            ),
        ]),
    ])
}

const mapStateToProps = state => ({})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(AdminPage)
