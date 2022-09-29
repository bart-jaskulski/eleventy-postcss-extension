const { readFileSync } = require('fs')
const { parse } = require('path')
const postcssrc = require('postcss-load-config')

const EngineCSS = require('./EngineCSS.js')

module.exports = (config) => {
  const engine = new EngineCSS();

  config.addTemplateFormats('css')

  config.addExtension('css', {
    outputFileExtension: 'css',
    init: async function() {
      engine.setInputDir(this.config.inputDir)
      engine.setIncludesDir(this.config.dir.includes)

      const {plugins, options} = await postcssrc()
      engine.setPlugins(plugins)
      engine.setOptions(options)
    },
    compile: function(input, inputPath) {
      if (!input) throw new Error('No input')

      const parsed = parse(inputPath)
      if (parsed.name.startsWith('_')) return

      return async ({page}) => engine.processCSS(input, {inputPath, outputPath: page && page.outputPath})
    }
  })
}
