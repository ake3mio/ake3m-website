const builder = require('xmlbuilder')
const SitemapConfig = require('./sitemap-config.json')

class SitemapProvider {

  constructor () {
    this._sitemap = null
    this.updateSitemap()
  }

  get sitemap () {
    return this._sitemap
  }

  updateSitemap () {

    // TODO: replace with service to dynamically update sitemap

    const doc = builder.create('urlset')

    doc.att(
      'xmlns',
      'http://www.sitemaps.org/schemas/sitemap/0.9',
    )

    SitemapConfig.urls.forEach(url => {

      const {
        loc,
        lastmod,
        changefreq,
        priority,
      } = url

      doc.ele('url').
        ele('loc').
        txt(`https://www.ake3m.com${loc}`).
        up().
        ele('lastmod').
        txt(lastmod).
        up().
        ele('changefreq').
        txt(changefreq).
        up().
        ele('priority').
        txt(priority).
        up()
    })

    this._sitemap = doc.end({ pretty: true })
  }
}

module.exports = new SitemapProvider()
