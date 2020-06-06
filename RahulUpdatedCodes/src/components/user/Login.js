import React, { Component } from 'react';
import { connect } from 'react-redux';
import 'materialize-css';
import './user.css';
import { TextInput, Toast } from 'react-materialize';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Alert from '@material-ui/lab/Alert';
import Icon from '@material-ui/core/Icon';
import { browserHistory } from "react-router";

class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            error: false,
            errorText: ''
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleInputChange(event) {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    }

    handleSubmit = (event) => {
        event.preventDefault();
        if (this.state.username && this.state.password) {

            this.props.history.push('/home');

        } else {
            this.setState({ error: true, errorText: 'Please enter username and password' });
        }
        var self = this;
        setTimeout(function () {
            self.setState({ error: false, errorText: '' });
        }, 3000);
    }

    render() {
        return (
            <div className="user-login">
                <p><Icon style={{ fontSize: 30, color: "white" }}>lock_circle</Icon></p>
                <h4>Sign In</h4>
                <form onSubmit={this.handleSubmit}>
                    <TextInput
                        id="TextInput-4"
                        label="Username"
                        name="username"
                        onChange={this.handleInputChange}
                    />
                    <TextInput
                        id="TextInput-4"
                        label="Password"
                        name="password"
                        password
                        onChange={this.handleInputChange}
                    />

                    <Button variant="contained" color="primary"
                        onClick={this.handleSubmit}
                        disableElevation>
                        Login
                    </Button>
                </form>
                {
                    this.state.error ? <Alert className="alert-toast" severity="error" color="error" duration="2000">
                        {this.state.errorText}
                    </Alert> : null
                }

            </div>
        )
    }
}

const mapStateToProps = state => ({

});

const mapDispatchToProps = {

};

export default connect(mapStateToProps, mapDispatchToProps)(Login);