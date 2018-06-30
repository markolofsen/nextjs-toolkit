const express = require('express')
const path = require('path')
const next = require('next')

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()
const routes = require('./routes')
// const app = next({dev: process.env.NODE_ENV !== 'production'})
const handler = routes.getRequestHandler(app)

const i18nextMiddleware = require('i18next-express-middleware')
const Backend = require('i18next-node-fs-backend')
const { i18nInstance } = require('./i18n')

// init i18next with serverside settings
// using i18next-express-middleware

// console.log('—————————')
// const lang = express().get('*', (req, res) => { return res })
// console.log(lang.mountpath.split('/'))

i18nInstance
  .use(Backend)
  .use(i18nextMiddleware.LanguageDetector)
  .init({
    fallbackLng: 'en',
    preload: ['en', 'de', 'ru'], // preload all langages
    ns: ['common', 'home', 'page2', 'cat'], // need to preload all the namespaces
    backend: {
      loadPath: path.join(__dirname, '/locales/{{lng}}/{{ns}}.json'),
      addPath: path.join(__dirname, '/locales/{{lng}}/{{ns}}.missing.json')
    },
    detection: {
      order: ['path']
    },
    // htmlTag: typeof window !== 'undefined' ? document.documentElement : false,
  }, () => {
    // loaded translations we can bootstrap our routes
    app.prepare()
      .then(() => {
        const server = express()

        // enable middleware for i18next
        server.use(i18nextMiddleware.handle(i18nInstance))

        // serve locales for client
        server.use('/locales', express.static(path.join(__dirname, '/locales')))

        // SEO
        server.use('/seo', express.static(path.join(__dirname, '/seo')))
        server.use('/robots.txt', express.static(path.join(__dirname, '/seo/robots.txt')))

        // missing keys
        server.post('/locales/add/:lng/:ns', i18nextMiddleware.missingKeyHandler(i18nInstance))

        server.use(handler)

        // use next.js
        server.get('*', (req, res) => handle(req, res))

        server.listen(3000, (err) => {
          if (err) throw err
          console.log('> Ready on http://localhost:3000')
        })
      })
  })
