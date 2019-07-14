import React from 'react'
import Logo from '../Logo';
import './index.scss';

const LinkHomeLogo = () => {
    return (
        <h2 className="LinkHomeLogo">
            <span className="LinkHomeLogo__header-text">Ake3m</span>
            <a href="/">
                <Logo/>
            </a>
        </h2>
    )
};

export default LinkHomeLogo
