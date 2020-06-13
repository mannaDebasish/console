import React from 'react';
import * as h from 'react-hyperscript'
import hh from '../../hh'
const { div } = hh(h)

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

export default function RecordEditModal(props) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const updateRecord = () => {
        props.onUpdateRecord();
        setOpen(false);
    }
    const handleChange = (e) => {
        if (e) {
            const { name, value } = e.target
            props.updateSelectedRecord(name, value);
        }

    }
    const { record, rows, recordType } = props;
    const cssPrefix = 'customer';
    const inputType = (obj) => {
        if (obj['type']) {
            return Textarea
        }
        return TextInput
    }
    const makeInputRow = (obj, dataEntry) => {
        return h(Row, { className: `${cssPrefix}-input-row` }, [h(Col, { className: `${cssPrefix}-input-label-col`, s: 3 }, [convertIdent(obj.name)]), h(Col, { className: 'cost-col', s: 9 }, [dataEntry])])
    }
    const convertIdent = (ident) => {
        return ident
            .split('_')
            .map(x => x.charAt(0).toUpperCase() + x.slice(1))
            .join(' ')
    }
    const makeSaveButton = (label, func) => {
        return div({ className: 'add-btn-area' }, [
            h(
                Button,
                {
                    className: `add-${cssPrefix}-button`,
                    node: 'button',
                    onClick: func,
                    style: {
                        marginRight: '5px',
                    },
                    waves: 'light',
                    //}, [ label, h(Icon, { left: true, className: 'add-exp-btn-icon' }, [ h( AddIcon ) ] )]
                }, [label]
            ),
        ])
    }
    const allCaps = (str) => {
        return str.trim().toUpperCase()
    }
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
                            <h2>Edit {convertIdent(recordType)}</h2>
                            <div className="close-modal" onClick={handleClose}> <CloseIcon color="secondary" /></div>
                        </div>
                        <div className="modal-body">
                            {
                                div({ className: `add-${cssPrefix}-area` }, [
                                    ...rows.map(obj => {
                                        return makeInputRow(obj, h(inputType(obj), { placeholder: convertIdent(obj.label), value: record[obj.name] ? record[obj.name] : '', name: obj.name, onChange: () => handleChange(event), onBlur: () => handleChange(event) }))
                                    })
                                ])
                            }
                        </div>
                        <div className="modal-footer">
                            {makeSaveButton('UPDATE ' + allCaps(recordType), updateRecord)}
                        </div>
                    </div>
                </Fade>
            </Modal>
        </div>
    );
}