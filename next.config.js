const path = require('path')
const webpack = require('webpack')
const withCSS = require('@zeit/next-css')


const withSass = require('@zeit/next-sass')
const autoprefixer = require('autoprefixer');


module.exports = withSass(withCSS({
  plugins: [
    {
      autoprefixer: {},
    },
    {
      'postcss-css-variables': {},
    }
  ],
  cssModules: true,
  cssLoaderOptions: {
    importLoaders: 1,
    localIdentName: "[local]___[hash:base64:5]",
  },

  webpack: (config, options) => {
    // config.module.rules.push({ test: /\.scss$/, loader: ['style-loader', 'css-loader', 'sass-loader'] });
    const { buildId, dev, isServer, defaultLoaders } = options;


    //MyHack: only save node_modules files in static/commons/main-[chunkhash].js
    if (!isServer && !dev) {
      for (plugin of config.plugins) {
        if (plugin['constructor']['name'] === 'CommonsChunkPlugin'
          && plugin.filenameTemplate == "static/commons/main-[chunkhash].js") {
          plugin.minChunks = function (module, count) {
            var needChunk = (
              module.resource &&
              // /\.js$/.test(module.resource) &&
              module.resource.indexOf(
                path.join(__dirname, './node_modules')
              ) === 0
            )
            if (needChunk) {
              // console.log("needChunk = ", module.resource)
            }
            return needChunk
          }
          break;
        }
      }
    }
    return config
  }
}))
