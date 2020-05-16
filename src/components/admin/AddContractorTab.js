import React, { Component } from 'react';
import { connect } from 'react-redux';
import 'materialize-css';
import './admin.css';
import { i18n } from '../../constant/stages';
import { Row, Col, TextInput, Textarea, Icon, Button, DatePicker, Select } from 'react-materialize';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import { ListSubheader } from '@material-ui/core';

const ref = React.createRef();

class AddContractorTab extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showAddContactor: false,
            newContractor: {},
            contractors: [
                { name: 'contractor 1', id: 'contractor 1', companyName: 'Company Ltd', companyAddress: '777 Brockton Avenue, Abington MA 2351', phone: '222-333-111', email: 'contractor@contract.com' },
                { name: 'contractor 2', id: 'contractor 2', companyName: 'Company Ltd', companyAddress: '888 Brockton Avenue, Abington MA 2351', phone: '222-333-111', email: 'contractor@contract.com' },
                { name: 'contractor 3', id: 'contractor 3', companyName: 'Company Ltd', companyAddress: '999 Brockton Avenue, Abington MA 2351', phone: '222-333-111', email: 'contractor@contract.com' },
                { name: 'contractor 4', id: 'contractor 4', companyName: 'Company Ltd', companyAddress: '100 Brockton Avenue, Abington MA 2351', phone: '222-333-111', email: 'contractor@contract.com' },
                { name: 'contractor 5', id: 'contractor 5', companyName: 'Company Ltd', companyAddress: '110 Brockton Avenue, Abington MA 2351', phone: '222-333-111', email: 'contractor@contract.com' }
            ],
            tempContractors: [
                { name: 'contractor 1', id: 'contractor 1', companyName: 'Company Ltd', companyAddress: '777 Brockton Avenue, Abington MA 2351', phone: '222-333-111', email: 'contractor@contract.com' },
                { name: 'contractor 2', id: 'contractor 2', companyName: 'Company Ltd', companyAddress: '888 Brockton Avenue, Abington MA 2351', phone: '222-333-111', email: 'contractor@contract.com' },
                { name: 'contractor 3', id: 'contractor 3', companyName: 'Company Ltd', companyAddress: '999 Brockton Avenue, Abington MA 2351', phone: '222-333-111', email: 'contractor@contract.com' },
                { name: 'contractor 4', id: 'contractor 4', companyName: 'Company Ltd', companyAddress: '100 Brockton Avenue, Abington MA 2351', phone: '222-333-111', email: 'contractor@contract.com' },
                { name: 'contractor 5', id: 'contractor 5', companyName: 'Company Ltd', companyAddress: '110 Brockton Avenue, Abington MA 2351', phone: '222-333-111', email: 'contractor@contract.com' }
            ]
        }
        this.onInputChange = this.onInputChange.bind(this);
        this.addContractor = this.addContractor.bind(this);
        this.handleSearchInputChange = this.handleSearchInputChange.bind(this);
        this.showAddSection = this.showAddSection.bind(this);
    }
    addContractor() {
        this.state.newContractor.id = 'contractor ' + (this.state.contractors.length + 1);
        let newList = [this.state.newContractor, ...this.state.contractors];
        this.setState({ contractors: newList });
        this.setState({ tempContractors: newList });
        this.setState({ showAddContactor: false });
    }
    showAddSection() {
        this.setState({ showAddContactor: true });
    }
    onInputChange(e) {
        const { name, value } = e.target;
        this.setState({ newContractor: Object.assign({}, this.state.newContractor, { [name]: value }) });
    }
    handleSearchInputChange(e) {
        const { value } = event.target;
        const updatedList = this.state.tempContractors.filter(function (item) {
            if (item.name.toLowerCase().search(value.toLowerCase()) !== -1) {
                return item;
            }
            if (item.id.toLowerCase().search(value.toLowerCase()) !== -1) {
                return item;
            }
            if (item.phone.toLowerCase().search(value.toLowerCase()) !== -1) {
                return item;
            }
            if (item.email.toLowerCase().search(value.toLowerCase()) !== -1) {
                return item;
            }
            if (item.companyName.toLowerCase().search(value.toLowerCase()) !== -1) {
                return item;
            }
            if (item.companyAddress.toLowerCase().search(value.toLowerCase()) !== -1) {
                return item;
            }
        });
        this.setState({ contractors: updatedList });
    }

    render() {
        const { contractors, showAddContactor } = this.state;
        return (
            <div className="contractor-tab">
                <div className="contractor-top">
                    <div className="search-area">
                        <TextInput
                            icon="search"
                            label="Search job"
                            className="search-contractor-input"
                            onChange={this.handleSearchInputChange}
                        />

                    </div>
                    <div className="add-btn-area">
                        <Button
                            className="add-contractor-button"
                            node="button"
                            onClick={this.showAddSection}
                            style={{
                                marginRight: '5px'
                            }}
                            waves="light"
                        >
                            ADD CONTRACTOR
                            <Icon left className="add-exp-btn-icon">
                                <AddIcon />
                            </Icon>
                        </Button>
                    </div>
                </div>
                {showAddContactor ?
                    <div className="add-contractor-area">
                        <Row className="contractor-input-row">
                            <Col
                                className="contractor-input-label-col"
                                s={3} >
                                Name:
                                        </Col>
                            <Col
                                className="cost-col"
                                s={9} >
                                <TextInput
                                    placeholder="Name"
                                    name="name"
                                    onChange={this.onInputChange}
                                    onBlur={this.onInputChange}
                                />
                            </Col>
                        </Row>
                        <Row className="contractor-input-row">
                            <Col
                                className="contractor-input-label-col"
                                s={3} >
                                Phone:
                                        </Col>
                            <Col
                                className="cost-col"
                                s={9} >
                                <TextInput
                                    placeholder="Phone"
                                    name="phone"
                                    onChange={this.onInputChange}
                                    onBlur={this.onInputChange}
                                />
                            </Col>
                        </Row>
                        <Row className="contractor-input-row">
                            <Col
                                className="contractor-input-label-col"
                                s={3} >
                                Email:
                                        </Col>
                            <Col
                                className="cost-col"
                                s={9} >
                                <TextInput
                                    placeholder="Email"
                                    name="email"
                                    onChange={this.onInputChange}
                                    onBlur={this.onInputChange}
                                />
                            </Col>
                        </Row>
                        <Row className="contractor-input-row">
                            <Col
                                className="contractor-input-label-col"
                                s={3} >
                                Company Name:
                                        </Col>
                            <Col
                                className="cost-col"
                                s={9} >
                                <TextInput
                                    placeholder="Company Name"
                                    name="companyName"
                                    onChange={this.onInputChange}
                                    onBlur={this.onInputChange}
                                />
                            </Col>
                        </Row>
                        <Row className="contractor-input-row">
                            <Col
                                className="contractor-input-label-col"
                                s={3} >
                                Company Address:
                                        </Col>
                            <Col
                                className="cost-col"
                                s={9} >
                                <Textarea
                                    placeholder="Company Address"
                                    name="companyAddress"
                                    id="companyAddressTextarea"
                                    onChange={this.onInputChange}
                                    onBlur={this.onInputChange}
                                />
                            </Col>
                        </Row>
                        <div className="add-btn-area">
                            <Button
                                className="add-contractor-button"
                                node="button"
                                onClick={this.addContractor}
                                style={{
                                    marginRight: '5px'
                                }}
                                waves="light"
                            >
                                SAVE CONTRACTOR
                            <Icon left className="add-exp-btn-icon">
                                    <AddIcon />
                                </Icon>
                            </Button>
                        </div>
                    </div> : null
                }
                <div className="contactor-list">
                    {
                        contractors.map((contactor, index) => {
                            return (
                                <div className="contactor-item" key={index}>
                                    <Row className="contractor-row">
                                        <Col
                                            className="contractor-label-col"
                                            s={3} >
                                            Contractor Id:
                                        </Col>
                                        <Col
                                            className="cost-col"
                                            s={9} >
                                            {contactor.id}
                                        </Col>
                                    </Row>
                                    <Row className="contractor-row">
                                        <Col
                                            className="contractor-label-col"
                                            s={3} >
                                            Contractor Name:
                                        </Col>
                                        <Col
                                            className="cost-col"
                                            s={9} >
                                            {contactor.name}
                                        </Col>
                                    </Row>
                                    <Row className="contractor-row">
                                        <Col
                                            className="contractor-label-col"
                                            s={3} >
                                            Phone Number:
                                        </Col>
                                        <Col
                                            className="cost-col"
                                            s={9} >
                                            {contactor.phone}
                                        </Col>
                                    </Row>
                                    <Row className="contractor-row">
                                        <Col
                                            className="contractor-label-col"
                                            s={3} >
                                            Email:
                                        </Col>
                                        <Col
                                            className="cost-col"
                                            s={9} >
                                            {contactor.email}
                                        </Col>
                                    </Row>
                                    <Row className="contractor-row">
                                        <Col
                                            className="contractor-label-col"
                                            s={3} >
                                            Company Name:
                                        </Col>
                                        <Col
                                            className="cost-col"
                                            s={9} >
                                            {contactor.companyName}
                                        </Col>
                                    </Row>
                                    <Row className="contractor-row">
                                        <Col
                                            className="contractor-label-col"
                                            s={3} >
                                            Company Address:
                                        </Col>
                                        <Col
                                            className="cost-col"
                                            s={9} >
                                            {contactor.companyAddress}
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

export default connect(mapStateToProps, mapDispatchToProps)(AddContractorTab);