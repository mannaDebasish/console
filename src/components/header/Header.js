import React, { Component } from 'react';
import { connect } from 'react-redux';
import 'materialize-css';
import './header.css';
import HomeIcon from '@material-ui/icons/Home';
import { withRouter } from 'react-router-dom';

class Header extends Component {

    constructor(props) {
        super(props);
        this.state = {

        };
        this.onRedirectHome = this.onRedirectHome.bind(this);

    }
    onRedirectHome() {
        this.props.history.push('/home');
    }

    render() {
        return (
            <div className="header">
                <div className="left-link">
                    <HomeIcon onClick={this.onRedirectHome} />
                </div>
                <div className="right-link">
                    Hi, Dab( Logout )
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({

});

const mapDispatchToProps = {

};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Header));