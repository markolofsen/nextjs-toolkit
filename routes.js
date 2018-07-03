const nextRoutes = require('next-routes')
// import { I18n } from './i18n'

const routes = module.exports = nextRoutes()
// const I18 = module.exports = I18n

//
// routes.add('blog', '/blog/:slug')
// routes.add('about', '/about-us/:foo(bar|baz)')
routes.add('index', '/:lang', 'catalog')

routes.add('offer', '/:lang/offer/:slug')


routes.add('offer_reviews', '/:lang/offer/:slug/reviews/:pagination')
routes.add('offer_reviews_all', '/:lang/offer/:slug/reviews', 'offer_reviews')


routes.add('catalog_all', '/:lang/catalog', 'catalog')
routes.add('catalog', '/:lang/catalog/:folder', 'catalog')
routes.add('catalog_page', '/:lang/catalog/:folder/:pagination', 'catalog')
