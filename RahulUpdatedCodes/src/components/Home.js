import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from './header/Header';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import JobPage from './job/JobPage';
import JobSearch from './job/JobSearch';

class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {

        }

    }


    render() {
        return (
            <div>
                <Header />
                <BrowserRouter>
                    <Switch>
                        <Route exact path="/home" component={JobSearch} />
                        <Route exact path="/jobDetails" component={JobPage} />
                    </Switch>
                </BrowserRouter>
            </div>
        )
    }
}

const mapStateToProps = state => ({

});

const mapDispatchToProps = {

};

export default connect(mapStateToProps, mapDispatchToProps)(Home);