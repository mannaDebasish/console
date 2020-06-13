import React, { Component } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useParams
} from "react-router-dom";
import { connect } from 'react-redux';
import 'materialize-css';
import './job.css';
import { TextInput, Row, Col } from 'react-materialize';
import Header from '../header/Header';
import { fetchJob } from '../../actions/icaAction';
import { getAllJobs, getAllCustomers } from '../../actions/recordAction';

class JobSearch extends Component {


    constructor(props) {
        super(props);
        this.state = {
            jobs: props.jobs,
            tempJobs: props.jobs,
            customers: props.customers
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onJobSelect = this.onJobSelect.bind(this);
    }
    componentDidMount() {
        this.props.getAllJobs().then(data => {
        })
        this.props.getAllCustomers().then(data => {

        })
    }
    componentWillReceiveProps(nextProps) {
        if (this.props.jobs != nextProps.jobs) {
            this.setState({ jobs: nextProps.jobs, tempJobs: nextProps.jobs })
        }
        if (this.props.customers != nextProps.customers) {
            this.setState({ customers: nextProps.customers });
        }
    }
    onJobSelect = (id) => {
        this.props.history.push('/jobDetails/' + id);
    }
    handleInputChange(event) {
        const { value } = event.target;
        const updatedList = this.state.tempJobs.filter(function (item) {
            return item.name.toLowerCase().search(
                value.toLowerCase()) !== -1;
        });
        this.setState({ jobs: updatedList });
    }

    handleSubmit = (event) => {
        event.preventDefault();

    }

    render() {
        const { jobs, jobSearch, jobSearchResult, customers } = this.state;
        function getCustomerName(customerId) {
            return customers.filter(customer => customer.doc._id === customerId).map(customer => customer.doc.name)[0];
        }
        return (
            <div>
                <Header />
                <div className="job-search">
                    <div>
                        <TextInput
                            icon="search"
                            id="TextInput-4"
                            label="Search job"
                            onChange={this.handleInputChange}
                        />

                    </div>
                    {
                        jobs.map((job, index) => {
                            return (<div
                                waves="light"
                                className={job.status === 'Completed' ? "job-item complete-job" : (job.status === 'Incomplete' ? 'job-item incomplete-job' : 'job-item progress-job')}
                                key={index}
                                onClick={() => this.onJobSelect(job.id)}>
                                <h4>{job.doc.name} ~ {getCustomerName(job.doc.customer_ref_id)}</h4>
                            </div>)
                        })
                    }

                </div>
            </div>

        )
    }
}

const mapStateToProps = state => {
    return {
        jobs: state.records.jobs,
        customers: state.records.customers
    };
}

const mapDispatchToProps = {
    fetchJob,
    getAllJobs,
    getAllCustomers
};

export default connect(mapStateToProps, mapDispatchToProps)(JobSearch);