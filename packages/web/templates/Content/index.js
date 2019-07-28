import React, { Component } from 'react';
import './styles/index.scss';
import { RichText } from 'prismic-reactjs';
import LinkHomeLogo from '../../components/LinkHomeLogo';
import Heading from '../../components/Heading';
import ContentFactory from '../../components/ContentFactory';
import Dots from '../../components/Dots';
import Back from '../../components/Back';
import Img from '../../components/Img';

class Content extends Component {

    rootRef = React.createRef();

    render() {

        const { content: { content, image, title } } = this.props;

        const imageStyles = { minHeight: image.dimensions.height };

        return (
            <div className="Content" ref={this.rootRef}>
                <div className="Content__head">
                    <LinkHomeLogo/>
                </div>
                <div className="Content__main">
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
        this.logo = this.rootRef.current.querySelector('.LinkHomeLogo .Logo');
        this.onScroll();
        window.addEventListener('scroll', this.onScroll, { passive: true })
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.onScroll)
    }

    onScroll = () => {
        this.setLogoScale();
    };

    setLogoScale() {
        const min = 0.38;
        const logoHeight = 100;
        const intrinsicProportion = (min / logoHeight);
        const scale = Math.max(min, 1 - (intrinsicProportion * window.scrollY));
        this.logo.style.transform = `scale(${scale})`;
    }
}


export default Content;
