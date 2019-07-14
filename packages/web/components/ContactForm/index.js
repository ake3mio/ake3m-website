import React, { Component } from 'react';
import './index.scss';
import Input from '../Input';
import Textarea from '../Textarea';
import Button from '../Button';
import ReCAPTCHA from "react-google-recaptcha";
import ContactThankYouMessage from '../ContactThankYouMessage';

const isEmpty = fieldName => value => value.replace(/\s+/gm, '') === '' && `${fieldName} is required`;
const emailRegex = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
const isInvalidEmail = fieldName => value => !emailRegex.test(String(value).toLowerCase()) && `${fieldName} is invalid`;

const FieldName = {
    name: 'name',
    telephone: 'telephone',
    email: 'email',
    message: 'message'
};
const formState = () => ({
    invalid: true,
    fields: {
        [FieldName.name]: {
            value: '',
            invalid: true
        },
        [FieldName.telephone]: {
            value: ''
        },
        [FieldName.email]: {
            value: '',
            invalid: true
        },
        [FieldName.message]: {
            value: '',
            invalid: true
        }
    }
})

class ContactForm extends Component {
    recaptchaRef = React.createRef();
    state = {
        form: formState(),
        submitted: false,
        submitting: false,
    };

    render() {

        const { form: { fields }, submitted, submitting, error, token } = this.state;
        const emailField = fields[FieldName.email];
        const telephoneField = fields[FieldName.telephone];
        const messageField = fields[FieldName.message];
        const nameField = fields[FieldName.name];
        const invalidEmail = emailField.invalid && emailField.touched;
        const invalidName = nameField.invalid && nameField.touched;
        const invalidMessage = messageField.invalid && messageField.touched;

        return submitted ?
            <ContactThankYouMessage/>
            : (
                <form className="ContactForm clearfix" onSubmit={this.onSubmit} method="post" action="/contact">

                    <div className="ContactForm__input-group">
                        <label htmlFor="">Your Name *</label>
                        <Input
                            error={invalidName}
                            type="text"
                            onChange={this.onNameChange}
                            onBlur={this.setTouched(FieldName.name, this.onNameChange)}
                            value={nameField.value}
                            name={FieldName.name}
                        />
                        {invalidName && (
                            <small className="ContactForm__input-error">
                                {nameField.error}
                            </small>
                        )}
                    </div>
                    <div className="ContactForm__input-group">
                        <label htmlFor="">Email *</label>
                        <Input
                            error={invalidEmail}
                            type="email"
                            onChange={this.onEmailChange}
                            onBlur={this.setTouched(FieldName.email, this.onEmailChange)}
                            value={emailField.value}
                            name={FieldName.email}
                        />
                        {invalidEmail && (
                            <small className="ContactForm__input-error">
                                {emailField.error}
                            </small>
                        )}
                    </div>
                    <div className="ContactForm__input-group">
                        <label htmlFor="">Telephone</label>
                        <Input
                            type="tel"
                            onChange={this.onTelChange}
                            onBlur={this.setTouched(FieldName.telephone, this.onTelChange)}
                            value={telephoneField.value}
                            name={FieldName.telephone}
                        />
                    </div>
                    <div className="ContactForm__input-group">
                        <label htmlFor="">Message *</label>
                        <Textarea
                            error={invalidMessage}
                            onChange={this.onMessageChange}
                            onBlur={this.setTouched(FieldName.message, this.onMessageChange)}
                            value={messageField.value}
                            name={FieldName.message}
                            maxLength={250}
                        />
                        {invalidMessage && (
                            <small className="ContactForm__input-error">
                                {messageField.error}
                            </small>
                        )}
                    </div>
                    <div className="ContactForm__ReCAPTCHA">
                        <ReCAPTCHA
                            theme="dark"
                            ref={this.recaptchaRef}
                            sitekey="6Lcts5YUAAAAANPdhYMfVZfzYVgOa-RBnw0n5KDC"
                            onExpired={this.resetReCAPTCHA}
                            onChange={this.setReCAPTCHA}
                        />
                    </div>
                    {error && (
                        <div className="ContactForm__error">
                            {error}
                        </div>
                    )}
                    <Button
                        className="ContactForm__submit-btn"
                        disabled={!token || submitting}>
                        Send
                    </Button>
                </form>
            );
    }

    onSubmit = event => {
        event.preventDefault();
        const { form } = this.state;

        if (form.invalid) {

            const inputs = [...event.target];

            return inputs.forEach(input => {
                window.setTimeout(function () {
                    input.focus();
                    input.blur();
                });
            });
        } else {
            this.setState(() => ({
                error: null,
                submitting: true
            }));
            this.props.onSubmit({
                ...this.getFormData(),
                token: this.state.token,
                submitting: false
            }).then(() => {
                this.recaptchaRef.current.reset();
                this.setState({
                    form: formState(),
                    submitted: true
                })
            }).catch(({ response: { data } }) => {
                this.recaptchaRef.current.reset();
                this.setState({
                    error: data.error,
                    submitting: false
                });
            })
        }

    };

    getFormData() {
        const fields = this.state.form.fields;
        const data = {};

        for (let fieldName in fields) {
            data[fieldName] = fields[fieldName].value;
        }
        return data;
    }

    onInputChange = (fieldName, validations = []) => {

        return event => {

            const value = event.target.value;
            const error = validations.reduce((message, validator) => {
                return message || validator(fieldName)(value);
            }, null);
            const form = this.state.form;


            const nextState = {
                form: {
                    fields: {
                        ...form.fields,
                        [fieldName]: {
                            ...form.fields[fieldName],
                            value: value,
                            invalid: !!error,
                            error
                        }
                    }
                }
            };

            let invalid = !!error;

            for (let i in nextState.form.fields) {
                if (nextState.form.fields[i].invalid) {
                    invalid = true;
                    break;
                }
            }

            nextState.form.invalid = invalid;

            this.setState(() => nextState)
        };
    };

    onNameChange = this.onInputChange(FieldName.name, [isEmpty]);
    onTelChange = this.onInputChange(FieldName.telephone);
    onEmailChange = this.onInputChange(FieldName.email, [isEmpty, isInvalidEmail]);
    onMessageChange = this.onInputChange(FieldName.message, [isEmpty]);

    resetReCAPTCHA = () => this.setState({ token: null });
    setReCAPTCHA = token => this.setState({ token });

    setTouched = (fieldName, callback) => {
        return (event) => {
            event.persist();
            const form = this.state.form;
            const nextState = {
                form: {
                    fields: {
                        ...form.fields,
                        [fieldName]: {
                            ...form.fields[fieldName],
                            touched: true
                        }
                    }
                }
            };

            this.setState(nextState, () => callback(event));

        }
    }
}

export default ContactForm;
