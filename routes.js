const nextRoutes = require('next-routes')
// import { I18n } from './i18n'

const routes = module.exports = nextRoutes()
// const I18 = module.exports = I18n

//
// routes.add('blog', '/blog/:slug')
// routes.add('about', '/about-us/:foo(bar|baz)')
routes.add('index', '/:lang')
routes.add('offer', '/:lang/offer/:slug')
routes.add('catalog', '/:lang/catalog/:folder')
