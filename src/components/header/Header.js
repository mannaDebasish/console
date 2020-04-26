import React, { Component } from 'react';
import { connect } from 'react-redux';
import 'materialize-css';
import './header.css';
import HomeIcon from '@material-ui/icons/Home';

class Header extends Component {

    constructor(props) {
        super(props);
        this.state = {

        }

    }

    render() {
        return (
            <div className="header">
                <div className="left-link">
                    <HomeIcon />
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

export default connect(mapStateToProps, mapDispatchToProps)(Header);