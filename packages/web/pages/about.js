import React, { Component } from 'react';
import client from "../core/http/client";
import Content from '../templates/Content';

class About extends Component {
    static getInitialProps = async () => {
        return client.get('/cms/about').then(({ data }) => data);
    };

    render() {
        return <Content content={this.props.data}  key="about"/>;
    }
}

export default About;
