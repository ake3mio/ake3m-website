import React from 'react';
import './index.scss';

const ContactThankYouMessage = () => {
    const line1 = 'Thank you for getting in contact.';
    const line2 = 'I will get back in touch with you shortly.';
    return (
        <div className="ContactThankYouMessage">
            <p data-text={line1}>{line1}</p>
            <p data-text={line2}>{line2}</p>
        </div>
    );
};

export default ContactThankYouMessage;
