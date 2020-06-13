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
import PictureAsPdfIcon from '@material-ui/icons/PictureAsPdf';
import { Icon } from '@material-ui/core';
import ICAModal from '../../modals/ICAModal';
import jsPDF from 'jspdf';
import Viewer, { SpecialZoomLevel } from '@phuocng/react-pdf-viewer';
import { Worker } from '@phuocng/react-pdf-viewer';
import '@phuocng/react-pdf-viewer/cjs/react-pdf-viewer.css';


//import PDFViewer from 'pdf-viewer-reactjs';


const sref = React.createRef();
const templateBodyRef = React.createRef();

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
    const [openICAModal, setOpenICAModal] = useState(false);
    const [tempBody, setTempBody] = useState('');
    const [mailBody, setMailBody] = useState('Please review and sign the attached ICA');
    const [pdfBlob, setPdfBlob] = useState('');
    const [generatePDFIconVisiblity, setGeneratePDFIconVisiblity] = useState('true');
    const [generateIconVisiblity, setGenerateIconVisiblity] = useState('true');

    useEffect(() => {
        document.getElementById('ica-form') ? setTempBody(document.getElementById('temp-body').innerHTML) : null

    }, [])

    const showFormField = event => {
        showForm(true);
        setGeneratePDFIconVisiblity(false);
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

    const openModal = () => {
        setOpenICAModal(true);
    }

    const closeModal = () => {
        setOpenICAModal(false);
    }

    const handleMailBodyChange = event => {
        setMailBody(event.target.value)
    }

    const handleSendMail = () => {
        //possible mail api reference here
    }

    const handleGenerateIconVisiblityChange = () => {

    }

    const handlePDFGenerate = () => {
        var element = document.getElementById('temp-body').innerText;
        const name = document.getElementById('cname').value;
        const rep = document.getElementById('rep').value;
        const sign = document.getElementById('sign').value;
        var pdfWidth = 210;
        var lMargin = 10;
        var rMargin = 10;
        var doc = new jsPDF('p', 'mm', 'a4');
        doc.setFontSize(11)
        var lines = doc.splitTextToSize(element, (pdfWidth - lMargin - rMargin));
        doc.text(5, 10, lines);
        doc.setFontSize(13);
        doc.setFontStyle('Times New Roman');
        doc.text(10, 120, `Customer Name: \n${name}`);
        doc.text(110, 120, `Represtative Name: \n${rep}`);
        doc.line(10, 128, 80, 128);
        doc.line(110, 128, 190, 128);
        doc.text(10, 150, 'Customer Signature: \n' + sign);
        doc.line(10, 158, 80, 158);
        var blob = doc.output('bloburl');
        setPdfBlob(blob);
        //console.log(11111, doc, doc.output('blob').text);
        generatePDFIconVisiblity ? setGeneratePDFIconVisiblity(false) : setGeneratePDFIconVisiblity(true);
        setGeneratePDFIconVisiblity(false);

        fetch(`http://localhost:8000/roof/console/jobphases/contract/12335`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/octet-stream"
            },
            body: doc.output('blob')
        }).then(res => res.blob())
            .then(posts => {
                var blob = URL.createObjectURL(posts);
                console.log(222, blob);
                //setPdfBlob(blob);
            })
    }


    const classes = useStyles();
    const url = pdfBlob;
    //console.log(url)
    return (
        <div className="ica">
            <div>
                <ICAModal open={openICAModal}
                    mailBody={mailBody}
                    handleSendMail={handleSendMail}
                    handleMailBodyChange={handleMailBodyChange}
                    closeModal={closeModal} />
            </div>
            {(ica.signed === undefined || ica.signed === null) && generatePDFIconVisiblity && generateIconVisiblity ?

                <div className={classes.buttonWrapper}> <Button variant="contained" color="secondary" className={classes.button} onClick={showFormField}>
                    Generate
                    <AddIcon />
                </Button></div> : null}
            {
                isForm ?
                    url ?
                        <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.4.456/build/pdf.worker.min.js">
                            <div style={{ height: '750px' }} >
                                {
                                    <Viewer fileUrl={url} />
                                }
                            </div>
                            <Button className={classes.button} variant="contained" color="primary" onClick={openModal}>
                                ADD PERSONAL MESSAGE IN PREPARATION FOR SENDING
                            <Icon right>
                                    <AddIcon />
                                </Icon>
                            </Button>
                        </Worker> :
                        <form id="ica-form" noValidate autoComplete="off">

                            <div id='pdf-data'>
                                <div id="temp-body" className="ica-temp-body" contentEditable>
                                    <p>Customer agrees to the following:
                                    <br />
                                        <br />
                                    Allow Forward Exteriors to correspond with Customer’s insurance company regarding applicable policies and claims.
                                    <br />
                                    The Customer will notify Forward Exteriors of the scheduled date and time when the insurance company will conduct the loss
                                    inspection and allow a Forward Exteriors representative to be present when the loss inspection occurs.
                                    <br />
                                    The Customer will provide Forward Exteriors with a copy of the line item Loss Report
                                    <br />
                                        <br />
                                    Forward Exteriors agrees to the following:
                                    <br />
                                        <br />
                                    The Company will work with the insurance company to come to an agreement on the scope and cost of the repair work to be done.
                                    <br />
                                    Charge the customer no fees for the Insurance Correspondence work which ordinarily has a base charge between $500-$1000
                                    <br />
                                        <br />
                                    IF THE COMPANY AND THE INSURANCE COMPANY COME TO AN AGREEMENT that requires an option for the customer to
                                    have no other cost, except the insurance proceeds and the deductible/co-pay, CUSTOMER AGREES TO AUTHORIZE
                                     THE COMPANY TO PROVIDE LABOR AND MATERIALS TO COMPLETE THE REPAIR.
                                    </p>
                                </div>
                                <div ref={sref}>
                                    <Row>
                                        <Col
                                            className="label-col"
                                            s={4} >
                                            <TextField className={classes.input} required id="cname" label="Customer Name" fullWidth
                                                value={props.cname} />
                                        </Col>
                                        <Col
                                            className="label-col"
                                            s={6} >
                                            <TextField required id="rep" label="Representative Name" fullWidth
                                                onChange={handleRepChange} />
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col
                                            className="label-col"
                                            s={4} >
                                            <TextField required id="sign" label="Customer Signature" fullWidth
                                                onChange={handleSignChange} disabled />
                                        </Col>
                                    </Row>
                                </div>
                                <div id="editor"></div>
                                <Button variant="contained" color="secondary" className={classes.button} onClick={handlePDFGenerate}>
                                    Generate
                                    <Icon right>
                                        <PictureAsPdfIcon />
                                    </Icon>
                                </Button>
                            </div>
                        </form> : null
            }
        </div>
    )
}

const mapStateToProps = state => ({
    cname: 'test',
});

const mapDispatchToProps = {

};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ICA));