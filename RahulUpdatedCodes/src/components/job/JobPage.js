import React, { Component } from 'react';
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

function JobPage() {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

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
                        <ICA />
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                        <FEEstimateTab />
                    </TabPanel>
                    <TabPanel value={value} index={2}>
                        <ExpensesTab />
                    </TabPanel>
                    <TabPanel value={value} index={3}>
                        <FileInsuranceClaimTab />
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

});

const mapDispatchToProps = {

};

export default connect(mapStateToProps, mapDispatchToProps)(JobPage);