import React from 'react'
import Head from 'next/head'
import Router from 'next/router'
import App, { Container } from 'next/app'
import { PageTransition } from 'next-page-transitions'
import '../styles/index.scss'

const TRANSITION_TIMEOUT = 800;

class MyApp extends App {
    static async getInitialProps({ Component, ctx }) {
        let pageProps = {}

        if (Component.getInitialProps) {
            pageProps = await Component.getInitialProps(ctx)
        }

        return { pageProps }
    }

    render() {
        const { Component, pageProps, router } = this.props;

        return (
            <Container>
                <Head>
                    <meta name="viewport" content="initial-scale=1, maximum-scale=1"/>
                    <link
                        href="https://fonts.googleapis.com/css?family=Major+Mono+Display|News+Cycle"
                        rel="stylesheet"
                    />
                    <link
                        rel="apple-touch-icon" sizes="180x180"
                        href="/static/favicons/apple-touch-icon.png"
                    />
                    <link
                        rel="icon" type="image/png" sizes="32x32"
                        href="/static/favicons/favicon-32x32.png"
                    />
                    <link
                        rel="icon"
                        type="image/png"
                        sizes="16x16"
                        href="/static/favicons/favicon-16x16.png"
                    />
                    <link
                        rel="manifest"
                        href="/static/favicons/site.webmanifest"
                    />
                    <link
                        rel="shortcut icon"
                        href="/static/favicons/favicon.ico"
                    />
                    <meta
                        name="msapplication-TileColor"
                        content="#000000"
                    />
                    <meta
                        name="msapplication-config"
                        content="/static/favicons/browserconfig.xml"
                    />
                    <meta
                        name="theme-color"
                        content="#000000"
                    />
                    <title>Home | AKE3M - Full Stack Software Engineer</title>
                    <meta name="tags"
                          content="Full Stack Software Engineer, Frontend Engineer, Backend Engineer, React, Angular, Typescript, Nodejs, express, Java 8, Spring Boot, micro services"/>
                    <meta name="description"
                          content="Full Stack Software Engineer based in London. Tackling all things javascript and java."/>
                    <meta name="robots" content="index, follow"/>
                </Head>
                <PageTransition timeout={TRANSITION_TIMEOUT} classNames="page-transition">
                    <Component {...pageProps} key={router.route}/>
                </PageTransition>
            </Container>
        )
    }

    componentDidMount() {
        function noScrollOnce(event) {
            event.preventDefault();
            document.removeEventListener('scroll', noScrollOnce);
        }

        if ('scrollRestoration' in window.history) {
            window.history.scrollRestoration = 'manual';
        } else {
            window.onpopstate = function () {
                document.addEventListener('scroll', noScrollOnce);
            }
        }


        const handleRouteChange = () => {

            setTimeout(() =>
                    window.scroll(0, 0),
                TRANSITION_TIMEOUT);
        };

        Router.events.on('routeChangeComplete', handleRouteChange)


    }
}

export default MyApp
