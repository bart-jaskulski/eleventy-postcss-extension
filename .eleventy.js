const { readFileSync, existsSync } = require('fs')
const merge = require('deepmerge')
const postcss = require('postcss')
const postcssrc = require('postcss-load-config')
const AtImport = require('postcss-import')

class EngineCSS {
  setPlugins(plugins) {
    this.plugins = plugins
  }

  setOptions(options) {
    this.options = options
  }

  async processCSS(src, inputPath){
    let plugins = this.plugins
    plugins.unshift(AtImport({
      path: ['src/views/css']
    }))
    return postcss(this.plugins).process(src, {from: inputPath}).then(result => result.css)
  }
}

module.exports = (config) => {
  const engine = new EngineCSS();

  config.addTemplateFormats('css')

  config.addExtension('css', {
    read: true,
    init: async function() {
      postcssrc().then(({plugins, options}) => {
        engine.setPlugins(plugins)
        engine.setOptions(options)
      })
    },
    compile: function(str, inputPath) {
      return async (data) => {
        if (str) {
          if (typeof str === "function") return str(data);

          if(typeof str === "string" && str.trim().charAt("0") === "@") {
            return engine.processCSS(str, inputPath)
          }

          return str;
        }

        const css = readFileSync(inputPath, 'utf8')
        return engine.processCSS(css, inputPath)

      }
    }
  })
}
