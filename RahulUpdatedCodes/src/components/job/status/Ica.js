import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import 'materialize-css';
import HomeIcon from '@material-ui/icons/Home';
import { withRouter } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import TextField from '@material-ui/core/TextField';
import FormLabel from '@material-ui/core/FormLabel';
import { Row, Col } from 'react-materialize';
import Pdf from "react-to-pdf";
import PictureAsPdfIcon from '@material-ui/icons/PictureAsPdf';
import { Icon } from '@material-ui/core';

const ref = React.createRef();

const useStyles = makeStyles(theme => ({
    buttonWrapper: {
        display: 'flex',
        justifyContent: 'flex-end'
    },
    button: {
        margin: theme.spacing(1),
        float: 'right'
    },
    input: {
        margin: '0px',
    },
    pdfButton: {
        float: 'right',
        marginTop: '-50px'
    }
}));

const ICA = (props) => {
    const [ica, setIca] = useState(props.ica);
    const [cSign, setCustSign] = useState('');
    const [cName, setCustName] = useState('');
    const [CRep, setCustRep] = useState('');
    const [isForm, showForm] = useState(false);

    const showFormField = event => {
        showForm(true)
    }

    const handleNameChange = event => {
        setCustName(event.target.value)
    }
    const handleRepChange = event => {
        setCustRep(event.target.value)
    }
    const handleSignChange = event => {
        setCustSign(event.target.value)
    }

    const classes = useStyles();
    console.log('refs = ', ref)

    return (
        <div className="ica">
            {ica.signed === undefined || ica.signed === null ?
                <div className={classes.buttonWrapper}> <Button variant="contained" color="secondary" className={classes.button} onClick={showFormField}>
                    Generate
                    <AddIcon />
                </Button></div> : null}
            {
                isForm ?
                    <form noValidate autoComplete="off" ref={ref}>
                        
                        <div contentEditable>
                            <p>Customer agrees to the following:</p>

                            <p>Allow Forward Exteriors to correspond with Customer’s insurance company regarding applicable policies and claims.
                            The Customer will notify Forward Exteriors of the scheduled date and time when the insurance company will conduct the loss inspection and allow a Forward Exteriors representative to be present when the loss inspection occurs.
                            The Customer will provide Forward Exteriors with a copy of the line item Loss Report	</p>
                            <p>Forward Exteriors agrees to the following:</p>
                            <p>The Company will work with the insurance company to come to an agreement on the scope and cost of the repair work to be done.
                            Charge the customer no fees for the Insurance Correspondence work which ordinarily has a base charge between $500-$1000</p>
                            <p>IF THE COMPANY AND THE INSURANCE COMPANY COME TO AN AGREEMENT that requires an option for the customer to have no other cost, except the insurance proceeds and the deductible/co-pay, CUSTOMER AGREES TO AUTHORIZE THE COMPANY TO PROVIDE LABOR AND MATERIALS TO COMPLETE THE REPAIR.</p>
                        </div>
                        <div>
                            <Row>
                                <Col
                                    className="label-col"
                                    s={4} >
                                    <TextField className={classes.input} required id="standard-basic" label="Customer Name" fullWidth
                                         value={props.cname} onChange={handleNameChange} />
                                </Col>
                                <Col
                                    className="label-col"
                                    s={6} >
                                    <TextField required id="standard-basic" label="Representative Name" fullWidth
                                        onChange={handleRepChange} />
                                </Col>
                            </Row>
                            <Row>
                                <Col
                                    className="label-col"
                                    s={4} >
                                    <TextField required id="standard-basic" label="Customer Signature" fullWidth
                                        onChange={handleSignChange} />
                                </Col>
                            </Row>
                        </div>
                        <Pdf targetRef={ref} filename="ica.pdf">
                            {({ toPdf }) => <Button variant="contained" color="secondary" className={classes.button} onClick={toPdf}>
                                Genarate
                     <Icon right>
                                    <PictureAsPdfIcon />
                                </Icon>
                            </Button>
                            }
                        </Pdf>
                    </form> : null
            }
        </div>
    )
}

const mapStateToProps = state => ({
    ica: state.job.state.ica,
    cname: state.job.cust.name
});

const mapDispatchToProps = {

};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ICA));