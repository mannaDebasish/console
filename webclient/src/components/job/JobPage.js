import React, { useState, useEffect } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useParams
} from "react-router-dom";
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
//import 'materialize-css';
import './job.css';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { stages } from '../../constant/stages';
import Header from '../header/Header';
import JobHeader from './JobHeader';
import FEEstimateTab from './FEEstimateTab';
import ICA from './status/Ica';
import ExpensesTab from './ExpensesTab';
import FileInsuranceClaimTab from './FileInsuranceClaimTab';
import { getAllJobs, getAllCustomers, getSingleJobPost, updateJob } from '../../actions/recordAction';

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <Typography
            component="div"
            role="tabpanel"
            hidden={value !== index}
            id={`vertical-tabpanel-${index}`}
            aria-labelledby={`vertical-tab-${index}`}
            {...other}
        >
            {value === index && <Box p={3}>{children}</Box>}
        </Typography>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
        id: `vertical-tab-${index}`,
        'aria-controls': `vertical-tabpanel-${index}`,
    };
}

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
        display: 'flex'
    },
    tabs: {
        borderRight: `1px solid ${theme.palette.divider}`,
    },
}));

const JobPage = (props) => {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);
    const [job, setJob] = React.useState({});

    useEffect(() => {
        props.getAllJobs()
        props.getAllCustomers()
        const { match } = props;
        const { url } = match;
        props.getSingleJobPost(url.split('/')[url.split('/').length - 1]).then((data) => {
        });
        setJob(props.job);
    }, [])

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const getRecord = (type) => {
        if (props.job && props.job.State && props.job.State.length > 0) {
            const { State } = props.job;
            return State.filter(item => item.name === type)[0]
        }
        else {
            return {}
        }
    }
    const updateExpenses = (expenses) => {
        props.job.expenses = expenses;
        props.updateJob(props.job)
    }
    const updateState = (task) => {
        const updatedJob = props.job.State.push(task);
        props.updateJob(props.job)
    }
    return (

        <div>
            <JobHeader />
            <div className={classes.root + ' tab-container'}>

                <Tabs
                    orientation="vertical"
                    variant="scrollable"
                    value={value}
                    onChange={handleChange}
                    aria-label="Vertical tabs example"
                    className={classes.tabs + ' tab-links'}
                >
                    {
                        stages.map((stage, index) => {
                            return (<Tab key={index} label={stage} {...a11yProps(index)} />)
                        })
                    }

                </Tabs>
                <div className="tab-contents">
                    <TabPanel value={value} index={0}>
                        <ICA ica={getRecord('ica')} />
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                        <FEEstimateTab />
                    </TabPanel>
                    <TabPanel value={value} index={2}>
                        <ExpensesTab expenses={props.job && props.job.expenses ? props.job.expenses : []} updateExpenses={updateExpenses} />
                    </TabPanel>
                    <TabPanel value={value} index={3}>
                        <FileInsuranceClaimTab insurance={getRecord('file insurance claim')} updateState={updateState} />
                    </TabPanel>
                    <TabPanel value={value} index={4}>
                        INSURANCE INSPECTION
                    </TabPanel>
                    <TabPanel value={value} index={5}>
                        FE CONTRACT
                    </TabPanel>
                    <TabPanel value={value} index={6}>
                        SUBMIT TO INSURANCE
                    </TabPanel>
                    <TabPanel value={value} index={7}>
                        INSURANCE APPROVAL
                    </TabPanel>
                    <TabPanel value={value} index={8}>
                        ORDER MATERIALS
                    </TabPanel>
                    <TabPanel value={value} index={9}>
                        TRADE COMPLETION
                    </TabPanel>
                    <TabPanel value={value} index={10}>
                        SUPPLEMENT
                    </TabPanel>
                    <TabPanel value={value} index={11}>
                        FINAL INVOICE
                    </TabPanel>
                </div>


            </div>
        </div>
    );
}

const mapStateToProps = state => ({
    jobs: state.records.jobs,
    customers: state.records.customers,
    job: state.records.job
});

const mapDispatchToProps = {
    getAllJobs,
    getAllCustomers,
    getSingleJobPost,
    updateJob
};

export default connect(mapStateToProps, mapDispatchToProps)(JobPage);