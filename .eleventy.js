const { readFileSync } = require('fs')
const postcssrc = require('postcss-load-config')

const EngineCSS = require('./EngineCSS.js')

module.exports = (config) => {
  const engine = new EngineCSS();

  config.addTemplateFormats('css')

  config.addExtension('css', {
    read: true,
    init: async function() {
      engine.setInputDir(this.config.inputDir)
      engine.setIncludesDir(this.config.dir.includes)

      postcssrc().then(({plugins, options}) => {
        engine.setPlugins(plugins)
        engine.setOptions(options)
      })
    },
    compile: function(str, inputPath) {
      return async (data) => {
        if (str) {
          if (typeof str === "function") return str(data);

          if (typeof str === "string" && str.trim().charAt("0") === "@") {
            return engine.processCSS(str, {inputPath, outputPath: data.page.outputPath})
          }

          return str;
        }

        const css = readFileSync(inputPath, 'utf8')
        return engine.processCSS(css, {inputPath, outputPath: data.page.outputPath})
      }
    }
  })
}
