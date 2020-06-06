import React, { Component } from 'react';
import { connect } from 'react-redux';
import 'materialize-css';
import './job.css';
import { Row, Col, TextInput, Icon, Button } from 'react-materialize';
import PictureAsPdfIcon from '@material-ui/icons/PictureAsPdf';
import JobPage from './JobPage';
import { ListSubheader } from '@material-ui/core';
import Pdf from "react-to-pdf";

const ref = React.createRef();

class FEEstimatePage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            estimate: {
            },
            estimateItems: [
                { item: 'Tear_Off', text: 'Tear Off' },
                { item: 'Actual_Squares', text: 'Actual Squares' },
                { item: 'High', text: 'High' },
                { item: 'Steep', text: 'Steep' },
                { item: 'Low_Slope_2-4/12', text: 'Low Slope 2-4/12' },
                { item: 'Layers', text: 'Layers' },
                { item: 'Overhang', text: 'Overhang' },
                { item: 'Pitch', text: 'Pitch' },
                { item: 'Attic_SF', text: 'Attic SF' },
                { item: 'Ice_and_water_barrier', text: 'Ice and water barrier' },
                { item: 'Roofing_Felt_Synthetic_Underlayment', text: 'Roofing Felt - Synthetic Underlayment' },
                { item: 'Shingles', text: 'Shingles' },
                { item: 'Shingle_Color', text: 'Shingle Color' },
                { item: 'Asphalt_Starter', text: 'Asphalt Starter' },
                { item: 'Hip_&_Ridge_Ridge_Cap_Shingles)', text: 'Hip & Ridge (Ridge Cap Shingles)' },
                { item: 'Rakes_Drip_Edge', text: 'Rakes (Drip Edge)' },
                { item: 'Drip_Edge_Color', text: 'Drip Edge Color' },
                { item: 'Step_Flashing', text: 'Step Flashing' },
                { item: 'Step_Flashing_Color', text: 'Step Flashing Color' },
                { item: 'Headwall_Flashing', text: 'Headwall Flashing' },
                { item: 'Headwall_Flashing_Color', text: 'Headwall Flashing Color' },
                { item: 'Chimney_Flashing', text: 'Chimney Flashing' },
                { item: 'Chimney_Flashing_Color', text: 'Chimney Flashing Color' },
                { item: 'Digital_Satellite_System_D&R', text: 'Digital Satellite System D&R' },
                { item: 'Skylight_flat_fixed', text: 'Skylight - flat fixed - up to 6 SF - D&R' },
            ]
        }
        this.onInputChange = this.onInputChange.bind(this);
        //this.generatePDF = this.generatePDF.bind(this);

    }

    onInputChange(e) {
        const { name, value } = e.target;
        !isNaN(parseInt(value)) ? this.setState({ estimate: Object.assign({}, this.state.estimate, { [name]: value }) }) : alert("Please enter number only");
    }

    render() {
        const { estimate, estimateItems } = this.state;
        return (
            <div className="fe-estimate">
                <div className="estimate-header">
                    <h5>Estimate:</h5>
                    <Button
                        className="confirm-button"
                        node="button"
                        style={{
                            marginRight: '5px'
                        }}
                        waves="light"
                    >
                        Confirm
                        </Button>
                    <Pdf targetRef={ref} filename="estimate.pdf">
                        {({ toPdf }) => <Button
                            className="pdf-button"
                            node="button"
                            style={{
                                marginRight: '5px'
                            }}
                            waves="light"
                            onClick={toPdf}
                        >
                            Generate
                            <Icon right>
                                <PictureAsPdfIcon />
                            </Icon>
                        </Button>
                        }
                    </Pdf>
                </div>
                <div className="estimate-body">
                    <div ref={ref} className="estimate-list">
                        {
                            estimateItems.map((item, index) => {
                                return (
                                    <Row key={index}>
                                        <Col
                                            className="label-col"
                                            s={4} >
                                            {item.text}
                                        </Col>
                                        <Col
                                            className="cost-col"
                                            s={8} >
                                            <span><b>$</b></span>
                                            <TextInput
                                                id={item.item}
                                                placeholder="Cost"
                                                name={item.item}
                                                value={estimate[item.item] ? estimate[item.item] : ''}
                                                onChange={this.onInputChange}
                                            />
                                        </Col>
                                    </Row>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({

});

const mapDispatchToProps = {

};

export default connect(mapStateToProps, mapDispatchToProps)(FEEstimatePage);