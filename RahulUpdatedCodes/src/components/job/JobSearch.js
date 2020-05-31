import React, { Component } from 'react';
import { connect } from 'react-redux';
import 'materialize-css';
import './job.css';
import { TextInput, Row, Col } from 'react-materialize';
import Header from '../header/Header';
import { fetchJob } from '../../actions/icaAction';

class JobSearch extends Component {


    constructor(props) {
        super(props);
        this.state = {
            jobs: [
                { id: '1', name: 'Job name 1', status: 'Completed', customer: 'Deb', inCharge: 'Deb' },
                { id: '1', name: 'Job name 2', status: 'Completed', customer: 'Deb', inCharge: 'Sourav' },
                { id: '1', name: 'Job name 3', status: 'Onprogress', customer: 'Deb', inCharge: 'Deb' },
                { id: '1', name: 'Job name 4', status: 'Incomplete', customer: 'Sourav', inCharge: 'Sourav' },
                { id: '1', name: 'Job name 5', status: 'Incomplete', customer: 'Deb', inCharge: 'Deb' },
                { id: '1', name: 'Job name 6', status: 'Completed', customer: 'Sourav', inCharge: 'Deb' },
            ],
            tempJobs: [
                { id: '1', name: 'Job name 1', status: 'Completed', customer: 'Deb', inCharge: 'Deb' },
                { id: '1', name: 'Job name 2', status: 'Completed', customer: 'Deb', inCharge: 'Sourav' },
                { id: '1', name: 'Job name 3', status: 'Onprogress', customer: 'Deb', inCharge: 'Deb' },
                { id: '1', name: 'Job name 4', status: 'Incomplete', customer: 'Sourav', inCharge: 'Sourav' },
                { id: '1', name: 'Job name 5', status: 'Incomplete', customer: 'Deb', inCharge: 'Deb' },
                { id: '1', name: 'Job name 6', status: 'Completed', customer: 'Sourav', inCharge: 'Deb' },
            ]
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onJobSelect = this.onJobSelect.bind(this);
    }
    componentWillReceiveProps(nextProps) {
        if (this.props.job != nextProps.job) {
            this.props.history.push('/jobDetails?id=' + nextProps.job._id);
        }
    }
    onJobSelect(event) {
        const a = event.target.innerText;
        this.props.fetchJob(event.target.innerText);
        //this.props.history.push('/jobDetails');
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
        const { jobs, jobSearch, jobSearchResult } = this.state;
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
                        this.state.jobs.map((job, index) => {
                            return (<div
                                waves="light"
                                className={job.status === 'Completed' ? "job-item complete-job" : (job.status === 'Incomplete' ? 'job-item incomplete-job' : 'job-item progress-job')}
                                key={index}
                                onClick={this.onJobSelect}>
                                <h4>{job.name} ~ {job.inCharge}</h4>
                            </div>)
                        })
                    }

                </div>
            </div>

        )
    }
}

const mapStateToProps = state => {
    console.log('hhd', state);
    return {
        job: state.job
    };
}

const mapDispatchToProps = {
    fetchJob
};

export default connect(mapStateToProps, mapDispatchToProps)(JobSearch);