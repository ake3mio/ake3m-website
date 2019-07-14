import React from 'react';
import classNames from 'classnames';
import './index.scss';

const Button = ({ children, className, ...rest }) => {
    return (
        <button
            className={classNames('Button', className)}
            {...rest}
        >
            {children}
        </button>
    );
};

export default Button;
