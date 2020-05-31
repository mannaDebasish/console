import React from 'react';
// import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import CloseIcon from '@material-ui/icons/Close';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import EditIcon from '@material-ui/icons/Edit';
import { Row, Col, TextInput, Textarea, Icon, Button } from 'react-materialize';
import './modal.css';

const useStyles = makeStyles(theme => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        width: '650px',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}));

export default function CustomerEditModal(props) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const saveConductor = () => {
        props.onUpdateContractor();
        setOpen(false);
    }
    const handleChange = (e) => {
        if (e) {
            const { name, value } = e.target
            props.updateSelectedContractor(name, value);
        }

    }
    const { contractor } = props;
    return (
        <div className="custom-modal-style">

            <Button variant="contained" color="#26A69A" onClick={handleOpen}>
                <EditIcon />
            </Button>

            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal + ' modal-style'}
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={open}>
                    <div className={classes.paper}>
                        <div className="modal-header">
                            <h2>Edit Customer</h2>
                            <div className="close-modal" onClick={handleClose}> <CloseIcon color="secondary" /></div>
                        </div>
                        <div className="modal-body">
                            <Row className="contractor-row">
                                <Col
                                    className="contractor-label-col"
                                    s={3} >
                                    Contractor Name:
                                        </Col>
                                <Col
                                    className="cost-col"
                                    s={9} >
                                    <TextInput
                                        placeholder="Name"
                                        name="name"
                                        value={contractor.name ? contractor.name : ''}
                                        onChange={() => handleChange(event)}
                                    />
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
                                    <TextInput
                                        placeholder="Phone Number"
                                        name="phone"
                                        value={contractor.phone ? contractor.phone : ''}
                                        onChange={() => handleChange(event)}
                                    />
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
                                    <TextInput
                                        placeholder="Email"
                                        name="email"
                                        value={contractor.email ? contractor.email : ''}
                                        onChange={() => handleChange(event)}
                                    />
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
                                    <Textarea
                                        placeholder="Address"
                                        name="company_address"
                                        value={contractor.address ? contractor.address : ''}
                                        onChange={() => handleChange(event)}
                                    />
                                </Col>
                            </Row>
                        </div>
                        <div className="modal-footer">
                            <Button
                                className="add-contractor-button"
                                node="button"
                                onClick={saveConductor}
                                style={{
                                    marginRight: '5px'
                                }}
                                waves="light"
                            >
                                SAVE
                        </Button>
                        </div>
                    </div>
                </Fade>
            </Modal>
        </div>
    );
}