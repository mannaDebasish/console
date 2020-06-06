import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
//import 'materialize-css';
import './admin.css';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { adminTab } from '../../constant/stages';
import Header from '../header/Header';
import AddContractorTab from './AddContractorTab';
import CustomerTab from './CustomerTab';
import SalesPersonTab from './SalesPersonTab';
import InsuranceCompaniesTab from './InsuranceCompaniesTab';

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

function AdminPage() {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <div className="admin-page">
            <Header />
            <div className={classes.root + ' admin-tab-container'}>
                <Tabs
                    orientation="vertical"
                    variant="scrollable"
                    value={value}
                    onChange={handleChange}
                    aria-label="Vertical tabs example"
                    className={classes.tabs + ' tab-links'}
                >
                    {
                        adminTab.map((stage, index) => {
                            return (<Tab key={index} label={stage} {...a11yProps(index)} />)
                        })
                    }

                </Tabs>
                <div className="tab-contents">
                    <TabPanel value={value} index={0}>
                        PAY EXPENSES
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                        <AddContractorTab />
                    </TabPanel>
                    <TabPanel value={value} index={2}>
                        <CustomerTab />
                    </TabPanel>
                    <TabPanel value={value} index={3}>
                        <SalesPersonTab />
                    </TabPanel>
                    <TabPanel value={value} index={4}>
                        <InsuranceCompaniesTab />
                    </TabPanel>
                    <TabPanel value={value} index={5}>
                        NEW JOB
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

export default connect(mapStateToProps, mapDispatchToProps)(AdminPage);