import React, { Component } from 'react';

export default class Ica extends Component {
    constructor(props) {
        super(props);
        this.state = {
            icaSigned: null
        }
    }
    render() {
        return (
            <div>
                {
                    this.state.icaSigned === null
                }
            </div>
        )
    }
}
