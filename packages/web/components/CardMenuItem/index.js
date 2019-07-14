import React, { Component } from 'react';
import Link from 'next/link';
import Router from 'next/router';
import classNames from 'classnames';
import Img from "../Img";
import './index.scss';
import Heading from "../Heading";

class CardMenuItem extends Component {

    root = React.createRef();

    static defaultProps = {
        offset: 0.8
    };

    loaded = false;

    state = {
        isMobile: true,
        touch: false
    };

    render() {
        const { item: { image, title, slug } } = this.props;
        return (
            <Link href={slug}>
                <a
                    ref={this.root}
                    className={this.rootClassName}
                    onClick={this.onClick}
                >

                    <Img {...image} onLoad={this.onImageLoad}/>
                    <Heading {...title[0]} type="heading2"/>
                </a>
            </Link>
        );
    }

    componentDidMount() {

        this.onScroll();

        this.bindMediaEvents();
    }

    async bindMediaEvents() {
        await import('matchmedia-polyfill');
        await import('matchmedia-polyfill/matchMedia.addListener');

        this.mediaQuery = window.matchMedia('(min-width: 50em)');

        if (this.mediaQuery.matches) {
            this.setState(() => ({ isMobile: false }));
        }

        if (this.mediaQuery.addEventListener) {
            this.mediaQuery.addEventListener("change", this.onMediaQueryUpdate);
        }

        document.addEventListener('scroll', this.onScroll);

        this.onImageLoad();

        if (typeof window !== 'undefined' && 'ontouchstart' in window) {
            this.setState(() => ({ touch: true }));
        }
    }

    componentDidUpdate(prevProps, prevState) {

        const isMobileState = !this.isMobileState(prevState) && this.isMobileState();
        const isNotMobileState = this.isMobileState(prevState) && !this.isMobileState();

        if (isMobileState) {
            this.detachEvents();
        } else if (isNotMobileState) {
            document.addEventListener('scroll', this.onScroll);
        }
    }

    componentWillUnmount() {
        this.convasSlideShow && this.convasSlideShow.dispose();
        this.detachEvents();
    }

    detachEvents() {
        document.removeEventListener('scroll', this.onScroll);
        this.setTranslate3d(0, 0, 0);
    }

    onMediaQueryUpdate = (event) => {
        if (event.matches) {
            this.setState(() => ({ isMobile: false }));
        } else {
            this.setState(() => ({ isMobile: true }));
        }
    };

    onScroll = () => {
        if (!this.state.isMobile) {
            const pixels = window.scrollY;
            this.setTranslate3d(0, pixels * this.props.offset, 0);
        }
    };

    onImageLoad = () => {

        if (this.loaded) {
            return;
        }

        import("./CanvasSlideshow").then(({ default: CanvasSlideshow }) => {

            const headerEl = this.root.current.querySelector(".Heading");

            const { item: { image: { dimensions, url } } } = this.props;

            const image = new Image();
            image.crossOrigin = "Anonymous";

            image.onload = () => {
                this.convasSlideShow = new CanvasSlideshow({
                    sprites: [image.src],
                    displacementImage: require('./images/clouds.jpg'),
                    autoPlay: true,
                    autoPlaySpeed: [0.3, 0.3],
                    displaceScale: [800, 500],
                    displaceAutoFit: true,
                    dispatchPointerOver: true,
                    parent: this.root.current,
                    stageWidth: dimensions.width,
                    stageHeight: dimensions.height,
                    eventSubscribers: [headerEl]
                });

                this.loaded = true;
            };
            image.src = url;

        })
    };


    onClick = (e) => {
        const { item: { slug } } = this.props;
        e.preventDefault();
        this.root.current.classList.add('CardMenuItem--is-selected');
        Router.push('/' + slug)
    };

    get rootClassName() {
        return classNames("CardMenuItem", {
            'CardMenuItem--is-touch': this.state.touch
        });
    }

    setTranslate3d(x, y, z) {
        this.root.current.style.transform = `translate3d(${x}px, ${y}px, ${z}px)`;
    }

    isMobileState(state = this.state) {
        return state.isMobile;
    }
}

export default CardMenuItem;
