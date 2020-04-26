import React, { Component } from 'react';
import { connect } from 'react-redux';
import 'materialize-css';
import './job.css';
import { TextInput, Row, Col } from 'react-materialize';

class JobSearch extends Component {

    constructor(props) {
        super(props);
        this.state = {
            jobs: [
                { id: '1', name: 'ICA', status: 'Completed', customer: 'Deb', inCharge: 'Deb' },
                { id: '1', name: 'FE Contract', status: 'Completed', customer: 'Deb', inCharge: 'Sourav' },
                { id: '1', name: 'Submit to insurance', status: 'Onprogress', customer: 'Deb', inCharge: 'Deb' },
                { id: '1', name: 'Insurance Approval', status: 'Incomplete', customer: 'Sourav', inCharge: 'Sourav' },
                { id: '1', name: 'Order materials', status: 'Incomplete', customer: 'Deb', inCharge: 'Deb' },
                { id: '1', name: 'Trade Completion', status: 'Completed', customer: 'Sourav', inCharge: 'Deb' },
            ]
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleInputChange(event) {
        const { value } = event.target;
        var updatedList = this.state.jobs;
        updatedList = updatedList.filter(function (item) {
            return item.name.toLowerCase().search(
                value.toLowerCase()) !== -1;
        });
        this.setState({ jobs: updatedList });
    }

    handleSubmit = (event) => {
        event.preventDefault();

    }

    render() {
        const { jobs } = this.state;
        return (
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
                        return (<div waves="light" className={job.status === 'Completed' ? "job-item complete-job" : (job.status === 'Incomplete' ? 'job-item incomplete-job' : 'job-item progress-job')} key={index}>
                            <h4>{job.name} ~ {job.inCharge}</h4>
                        </div>)
                    })
                }


            </div>
        )
    }
}

const mapStateToProps = state => ({

});

const mapDispatchToProps = {

};

export default connect(mapStateToProps, mapDispatchToProps)(JobSearch);