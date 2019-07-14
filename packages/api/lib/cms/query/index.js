const Prismic = require('prismic-javascript')

const getHomePage = (api) => api.query(
  Prismic.Predicates.at('document.type', 'homepage'),
  {
    'fetchLinks': [
      'contact.title',
      'contact.image',
      'content.title',
      'content.image',
    ],
  },
).then(response => response.results[0])

const documentTypePredicate = type => Prismic.Predicates.at(
  'document.type',
  type,
)

const getContentPage = (uid) => api => api.getByUID('content', uid)

const getAboutPage = getContentPage('about')

const getContactPage = (api) => {
  return api.query(
    documentTypePredicate('contact'),
  ).then(response => response.results[0])
}

module.exports = {
  getHomePage,
  getContactPage,
  getAboutPage
}
