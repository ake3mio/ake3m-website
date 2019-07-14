import React, { Component } from 'react';
import HomePage from '../templates/HomePage';
import client from "../core/http/client";

class Index extends Component {
    static getInitialProps = async () => {
        return client.get('/cms/home').then(({ data }) => data);
    };

    render() {
        return (
            <HomePage content={this.props.data}/>
        );
    }
}

export default Index;
