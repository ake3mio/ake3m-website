import React from 'react';

const HeadingElementType = {
    'heading1': 'h1',
    'heading2': 'h2',
    'heading3': 'h3',
};

const Heading = ({type, text}) => {
    const HeadingElement = HeadingElementType[type];
    return (
        <HeadingElement className={`Heading Heading--${type}`}>
            {text}
        </HeadingElement>
    );
};

export default Heading;
