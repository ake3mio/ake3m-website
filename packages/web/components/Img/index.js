import React from 'react';
import Head from 'next/head';

const Img = ({ url, alt, dimensions, className = '', preload, ...rest }) => {
    return (
        <React.Fragment>
            <Head>
                <link rel="prefetch" href={url} as="image" />
            </Head>
            <img
                src={url}
                alt={alt}
                {...dimensions}
                {...rest}
                className={`Img ${className}`}
            />
        </React.Fragment>
    );
};

export default Img;
