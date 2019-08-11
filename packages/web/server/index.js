const express = require('express');
const next = require('next');
const path = require('path');
const redirect = require('./redirect');
const sitemap = require('./sitemap');

const PROJECT_ROOT_PATH = path.join(__dirname, '..');
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev, dir: PROJECT_ROOT_PATH });
const handle = app.getRequestHandler();
const { parse } = require('url');

const LAST_MODIFIED = (new Date()).toGMTString();
const ASSET_PREFIX = process.env.ASSET_PREFIX || '';
const ONE_YEAR = 22896000000;

app.prepare().then(() => {

    const maxAge = dev ? 0 : ONE_YEAR;
    const server = express();
    const publicPath = path.join(PROJECT_ROOT_PATH, 'public');
    const staticPath = path.join(PROJECT_ROOT_PATH, '.next/static');

    server.disable('x-powered-by');

    redirect(server);


    server.use(express.static(publicPath));
    server.use(`/${ASSET_PREFIX}/_next/static`, express.static(staticPath, { maxAge: maxAge }));
    server.use('/_next/static', express.static(staticPath, { maxAge: maxAge }));

    sitemap(server);

    server.get('*', (req, res) => {
        const parsedUrl = parse(req.url, true);
        res.set('Last-Modified', LAST_MODIFIED);
        handle(req, res, { ...parsedUrl })
    });

    server.listen(3000, err => {
        if (err) throw err;
        console.log('> Ready on http://localhost:3000')
    })
});
