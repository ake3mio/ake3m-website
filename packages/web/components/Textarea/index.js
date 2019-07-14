import React from 'react';
import classNames from 'classnames';
import './index.scss';

const Textarea = ({ error, ...rest }) => {
    return (
        <textarea className={classNames("Textarea", { 'Textarea--has-error': error })} {...rest}/>
    );
};

export default Textarea;
