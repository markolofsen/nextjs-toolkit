const express = require('express')
const path = require('path')
const next = require('next')
const proxy = require('http-proxy-middleware');

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
// const handle = app.getRequestHandler()
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

// const apiDomain = 'http://127.0.0.1:8000';
//
const ENV = process.env.NODE_ENV || 'development';
const isProduction = ENV === 'production';
// const apiDomain = isProduction ? 'http://127.0.0.1:8001' : 'http://127.0.0.1:8000';
const apiDomain = 'https://api.tenerifebook.com';

const acceptedLangs = ['en','es','ru','fr','de'];

i18nInstance
  .use(Backend)
  .use(i18nextMiddleware.LanguageDetector)
  .init({
    fallbackLng: 'en',
    preload: acceptedLangs, // preload all langages
    ns: ['common', 'home', 'page2', 'cat'], // need to preload all the namespaces
    backend: {
      loadPath: path.join(__dirname, '/locales/{{lng}}/{{ns}}.json'),
      addPath: path.join(__dirname, '/locales/{{lng}}/{{ns}}.missing.json')
    },
    detection: {
      order: ['htmlTag','path']
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

        server.use('/css', express.static(path.join(__dirname, '/style/css')))
        server.use('/favicon.png', express.static(path.join(__dirname, '/style/img/favicon.png')))

        // PROXY
        server.use('/robots.txt', proxy({
          target: apiDomain,
          changeOrigin: true,
        }))
        server.use('/sitemap.xml', proxy({
          target: apiDomain,
          changeOrigin: true,
        }))
        // server.use('/media/', proxy({
        //   target: apiDomain,
        //   xfwd: true,
        //   secure: true,
        //   changeOrigin: true,
        //   logLevel: "silent", //or debug
        //   headers: {
        //     cookie: ""
        //   },
        //   onProxyReq: function (proxyReq, req, res) {
        //     // add custom header to request
        //     proxyReq.setHeader('User-Agent', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/44.0.2403.89 Safari/537.36');
        //     proxyReq.setHeader('X-Forwarded-Host', 'https://tenerifebook.com');
        //     /// ?? how can I rewrite the params here ???
        //   },
        // }))
        // server.use('/api/', proxy({
        //   // target: 'http://127.0.0.1:8000',
        //   target: apiDomain,
        //   xfwd: true,
        //   secure: true,
        //   changeOrigin: true,
        //   logLevel: "silent", //or debug
        //   headers: {
        //     cookie: ""
        //   },
        //   onProxyReq: (proxyReq, req, res) => {
        //     if(req.url.indexOf('/?') !== -1) {
        //       proxyReq.path += '&format=json';
        //     } else {
        //       proxyReq.path += '?format=json';
        //     }
        //   },
        // }))


        // missing keys
        server.post('/locales/add/:lng/:ns', i18nextMiddleware.missingKeyHandler(i18nInstance))


        // LANGUAGE REDIRECTS
        server.get('*', (req, res, next) => {

          // www redirect
          if(isProduction) {
            if (req.headers.host.match(/^www/) !== null) {
          		res.redirect('https://' + req.headers.host.replace(/^www\./, '') + req.url);
          	} else {
          		next();
          	}
          }

          // console.log('-------------')
          const url = req.url.split('/')
          const getLng = url[1]

          function langRedirect() {
            const browserLang = req.headers["accept-language"].split(',')[0].substr(0,2)
            if(acceptedLangs.indexOf(browserLang) === -1) {
              res.redirect(`/en`);
            } else {
              res.redirect(`/${browserLang}`);
            }
          }

          // Redirect by language detect from main page
          if(req.url == '/') langRedirect()

          // Redirect if wrong language
          if(getLng != '_next') {
            if(acceptedLangs.indexOf(getLng) === -1) {
              langRedirect()
            }
          }

          handler(req, res)

        })

        server.use(handler) //For sure

        server.listen(3000, (err) => {
          if (err) throw err
          console.log('> Ready on http://localhost:3000')
        })
      })
  })
