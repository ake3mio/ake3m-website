import React, { Component } from 'react';
import client from "../core/http/client";
import Content from "../components/Content";

class Contact extends Component {
    static getInitialProps = async () => {
        return client.get('/cms/contact').then(({ data }) => {

            return data;
        });
    };

    render() {
        return (
            <Content
                content={this.props.data}
                pageType="contact"
                key="contact"
            />
        );
    }
}

export default Contact;
