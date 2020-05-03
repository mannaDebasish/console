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

const useStyles = makeStyles(theme => ({
    button: {
        margin: theme.spacing(1),
        float: 'right'
    },
    input: {
        margin: '0px',
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
    return (
        <div className="ica">
            {ica.signed === undefined || ica.signed === null ?
                <Button variant="contained" color="secondary" className={classes.button} onClick={showFormField}>
                    Genarate
                    <AddIcon />
                </Button> : null}
            {
                isForm ?
                    <form noValidate autoComplete="off">
                        <div>
                            <TextField className={classes.input} required id="standard-basic" label="Customer Name" fullWidth
                                onChange={handleNameChange} />
                            <TextField required id="standard-basic" label="Customer Signature" fullWidth
                                onChange={handleSignChange} />
                            <TextField required id="standard-basic" label="Representative Name" fullWidth
                                onChange={handleRepChange} />
                        </div>
                        <Button variant="contained" color="primary" className={classes.button}>
                            Genarate PDF
            </Button>
                    </form> : null
            }
        </div>
    )
}

const mapStateToProps = state => ({
    ica: state.job.state.ica
});

const mapDispatchToProps = {

};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ICA));