import React, { Component } from 'react';
import Img from "../Img";
import './index.scss';
import Heading from "../Heading";
import Back from "../Back";
import Dots from '../Dots';
import { RichText } from 'prismic-reactjs';
import LinkHomeLogo from '../LinkHomeLogo';
import ContentFactory from '../ContentFactory';

class Content extends Component {

    contentRef = React.createRef();

    render() {

        const { content: { content, image, title }, pageType } = this.props;

        const imageStyles = { minHeight: image.dimensions.height };

        return (
            <div className="Content">
                <LinkHomeLogo/>
                <div className="Content__main" ref={this.contentRef}>
                    <Heading {...title[0]}/>
                    <RichText
                        render={content}
                    />
                    <ContentFactory {...this.props}/>
                    <Dots/>
                    <Back/>
                </div>
                <aside className="Content__image-aside">
                    {image && (
                        <Img
                            {...image}
                            style={imageStyles}
                            preload={true}
                        />
                    )}
                </aside>
            </div>
        );
    }

    componentDidMount() {
        this.descendants = this.getDescendants();
        this.onScroll();
        window.addEventListener('scroll', this.onScroll, { passive: true })
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.onScroll)
    }

    onScroll = () => {
        this.descendants.forEach(({ element, offsetTop, getOpacity }, index) => {

            if (offsetTop < window.scrollY) {
                element.style.opacity = getOpacity(index);
            } else {
                element.style.opacity = '1';
            }
        });
    };

    getDescendants = () => [...this.contentRef.current.children].map(descendant => {

        const offsetTop = descendant.offsetTop - 160;

        return {
            element: descendant,
            offsetTop: offsetTop,
            getOpacity: (index) => {

                const scrollY = window.scrollY === 0 ? 1 : window.scrollY;
                const diff = index === 0 ? 10 : 200;
                const delta = Math.abs(((offsetTop - diff) / scrollY));

                return delta
            }
        };
    });
}


export default Content;
