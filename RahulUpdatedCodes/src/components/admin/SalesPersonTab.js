import React, { Component } from 'react';
import { connect } from 'react-redux';
import 'materialize-css';
import './admin.css';
import { i18n } from '../../constant/stages';
import { Row, Col, TextInput, Textarea, Icon, Button, DatePicker, Select } from 'react-materialize';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import AddIcon from '@material-ui/icons/Add';
import { ListSubheader } from '@material-ui/core';
import { getAllSealsPersons, addNewSealsPerson, updateSealsPerson } from '../../actions/salesPersonAction';
import SealsPersonEditModal from '../modals/SealsPersonEditModal';

const ref = React.createRef();

class SalesPersonTab extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showAddContactor: false,
            openEditModal: false,
            newContractor: {},
            contractors: props.contractors.salesPersons,
            tempContractors: props.contractors.salesPersons,
            selectedContractor: {}
        }
        this.onInputChange = this.onInputChange.bind(this);
        this.addContractor = this.addContractor.bind(this);
        this.getContractors = this.getContractors.bind(this);
        this.handleSearchInputChange = this.handleSearchInputChange.bind(this);
        this.showAddSection = this.showAddSection.bind(this);
        this.updateSelectedContractor = this.updateSelectedContractor.bind(this);
        this.onUpdateContractor = this.onUpdateContractor.bind(this);
    }

    componentDidMount() {
        this.getContractors();
    }
    getContractors() {
        this.props.getAllSealsPersons().then((data) => {
            if (data && data.length > 0) {
                this.setState({ contractors: data });
                this.setState({ tempContractors: data });
            }
            else {
                this.setState({ showAddContactor: true });
            }
        });
    }

    // Edit Modal functions
    onSelectContractor(cont) {
        this.setState({ selectedContractor: cont })
    }
    updateSelectedContractor(name, value) {
        this.setState({ selectedContractor: Object.assign({}, this.state.selectedContractor, { [name]: value }) })
    }
    onUpdateContractor() {
        this.props.updateSealsPerson(this.state.selectedContractor).then((data) => {
            this.getContractors();
        });
    }
    // End of Edit Modal functions

    addContractor() {
        if (this.state.newContractor.name && this.state.newContractor.email && this.state.newContractor.phone && this.state.newContractor.address) {
            this.state.newContractor.type = 'saleperson';
            let newList = this.state.contractors.length > 0 ? [this.state.newContractor, ...this.state.contractors] : [this.state.newContractor];
            this.setState({ contractors: newList });
            this.setState({ tempContractors: newList });
            this.setState({ showAddContactor: false });
            this.props.addNewSealsPerson(this.state.newContractor).then((data) => {
                this.getContractors();
            });
        } else {
            alert("Please enter all contractor details")
        }

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
            if (item._id.toLowerCase().search(value.toLowerCase()) !== -1) {
                return item;
            }
            if (item.phone.toLowerCase().search(value.toLowerCase()) !== -1) {
                return item;
            }
            if (item.email.toLowerCase().search(value.toLowerCase()) !== -1) {
                return item;
            }
            if (item.address.toLowerCase().search(value.toLowerCase()) !== -1) {
                return item;
            }
        });
        this.setState({ contractors: updatedList });
    }

    render() {
        const { contractors, showAddContactor, openEditModal, selectedContractor } = this.state;
        return (
            <div className="contractor-tab">
                <div className="contractor-top">
                    <div className="search-area">
                        <TextInput
                            icon="search"
                            label="Search Salesperson"
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
                            ADD SALESPERSON
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
                                Address:
                                        </Col>
                            <Col
                                className="cost-col"
                                s={9} >
                                <Textarea
                                    placeholder="Address"
                                    name="address"
                                    id="addressTextarea"
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
                                ADD SALESPERSON
                            <Icon left className="add-exp-btn-icon">
                                    <AddIcon />
                                </Icon>
                            </Button>
                        </div>
                    </div> : null
                }
                <div className="contactor-list">
                    {
                        contractors && contractors.length > 0 ?
                            contractors.map((contactor, index) => {
                                return (
                                    <div className="contactor-item" key={index}>
                                        <div className="item-edit-lint" onClick={() => this.onSelectContractor(contactor)}>
                                            <SealsPersonEditModal index={index} contractor={selectedContractor}
                                                updateSelectedContractor={this.updateSelectedContractor}
                                                onUpdateContractor={this.onUpdateContractor} />
                                        </div>
                                        {/* <Row className="contractor-row">
                                            <Col
                                                className="contractor-label-col"
                                                s={3} >
                                                Contractor Id:
                                        </Col>
                                            <Col
                                                className="cost-col"
                                                s={9} >
                                                {contactor._id}
                                            </Col>
                                        </Row> */}
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
                                                Address:
                                        </Col>
                                            <Col
                                                className="cost-col"
                                                s={9} >
                                                {contactor.address}
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
    contractors: state.salesPersons
});

const mapDispatchToProps = {
    getAllSealsPersons,
    addNewSealsPerson,
    updateSealsPerson
};

export default connect(mapStateToProps, mapDispatchToProps)(SalesPersonTab);