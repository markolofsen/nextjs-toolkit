const nextRoutes = require('next-routes')
const routes = module.exports = nextRoutes()

// routes.add('blog', '/blog/:slug')
// routes.add('about', '/about-us/:foo(bar|baz)')
routes.add('index', '/:lang')
routes.add('catalog', '/:lang/catalog')
routes.add('offer', '/offer/:slug')
