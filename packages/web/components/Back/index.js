import React from 'react'
import Link from 'next/link'
import './index.scss'

const Back = ({ href }) => {
    return (
        <div className="Back">
            <Link href={href}>
                <a className="Back__button">
                    BACK
                    <div className="Back__line"/>
                </a>
            </Link>
        </div>
    )
}

Back.defaultProps = {
    href: '/'
};

export default Back
