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
        this.onRedirectAdmin = this.onRedirectAdmin.bind(this);
    }
    onRedirectHome() {
        this.props.history.push('/home');
    }
    onRedirectAdmin() {
        this.props.history.push('/admin');
    }

    render() {
        return (
            <div className="header">
                <div className="left-link">
                    <HomeIcon onClick={this.onRedirectHome} />
                    <div className="header-menu">
                        <div className="menu-item" onClick={this.onRedirectHome}>Main</div>
                        <div className="menu-item" onClick={this.onRedirectAdmin}>Admin</div>
                    </div>
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