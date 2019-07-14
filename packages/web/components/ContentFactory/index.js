import React, { Component } from 'react';
import ContactForm from "../ContactForm";
import client from '../../core/http/client';

class ContentFactory extends Component {
    render() {
        return this.getContent();
    }

    getContent() {

        const { pageType } = this.props;

        switch (pageType) {
            case 'contact':
                return (
                    <ContactForm
                        {...this.props}
                        onSubmit={this.contact}
                    />
                );
            default:
                return null;
        }
    }

    contact(data) {
        return client.post('/contact', data).then(({ data }) => console.log(data))
    }
}

export default ContentFactory;
