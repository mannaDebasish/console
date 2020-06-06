import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { Row, Col } from 'react-materialize';
import Button from '@material-ui/core/Button';
import { Icon } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import SaveIcon from '@material-ui/icons/Save';
import EmailIcon from '@material-ui/icons/Email';
import { TextareaAutosize } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
        margin: theme.spacing(1),
        float: 'right'
  },
  paper: {
    backgroundColor: 'white',//theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    backgroundSize: 'cover'
  },
}));

const ICAModal = (props) => {
	const classes = useStyles();
	/*const [open, setOpen] = React.useState(false);
	const handleOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};*/

	console.log('bodyprops ============', props.body);
	const { open, closeModal, mailBody, handleMailBodyChange, handleSendMail } = props;
	console.log('open props', open)
	return (
	<div>
	  <Modal disableEnforceFocus
	    aria-labelledby="transition-modal-title"
	    aria-describedby="transition-modal-description"
	    className={classes.modal}
	    open={open}
	    onClose={closeModal}
	    closeAfterTransition
	    BackdropComponent={Backdrop}
	    BackdropProps={{
	      timeout: 500,
	    }}
	  >
	    <Fade in={open}>
	    	<div>
				<div className={classes.paper}>
					<Typography variant="h5" gutterBottom>
        				Message to Customer
      				</Typography>
					<Row>
				    	<TextareaAutosize
							rowsMax={30}
							className={classes.input}
							aria-label="maximum height"
							placeholder="Maximum 4 rows"
							defaultValue={mailBody}
							onChange={handleMailBodyChange}
						/>					
					</Row>
					<Row>
						<Button className={classes.button} variant="contained" color="secondary" onClick={handleSendMail}>
			                SEND TO CUSTOMER
			                <Icon right>
			                    <EmailIcon />
			                </Icon>			        						
	        			</Button>
        			</Row>
        		</div>
		    </div>		    	 
	    </Fade>
	  </Modal>
	</div>
);
}

export default ICAModal;

//<div className={classes.paper} dangerouslySetInnerHTML={{ __html: props.body }} />
