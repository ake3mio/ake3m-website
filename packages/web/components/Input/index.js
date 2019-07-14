import React from 'react';
import classNames from 'classnames';
import './index.scss';

const Input = ({ type = 'text', error, ...rest }) => {
    return (
        <input type={type} className={classNames("Input", { 'Input--has-error': error })} {...rest}/>
    );
};

export default Input;
