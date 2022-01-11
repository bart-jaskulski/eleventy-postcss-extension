const path = require('path');
const merge = require('lodash.merge');
const AtImport = require('postcss-import');
const postcss = require('postcss');

function isPluginActive(plugin) {
  // eslint-disable-next-line no-param-reassign
  if (typeof plugin === 'function') plugin = plugin();
  return plugin.postcssPlugin === 'postcss-import';
}

class EngineCSS {
  async processCSS(src, { inputPath, outputPath }) {
    if (!this.plugins) throw new Error('Could not successfuly read postcss config file');

    const config = merge({}, this.options, { from: inputPath, to: outputPath });
    return postcss(this.plugins)
      .process(src, config)
      .then((result) => result.css);
  }

  setInputDir(inputDir) {
    if (inputDir) {
      this.inputDir = inputDir;
    }
  }

  setIncludesDir(includesDir) {
    if (includesDir) {
      this.includesDir = path.join(this.inputDir, includesDir);
    }
  }

  setPlugins(plugins) {
    if (!plugins.find(isPluginActive)) {
      plugins.unshift(AtImport({
        path: [this.includesDir],
      }));
    }

    this.plugins = plugins;
  }

  setOptions(options) {
    this.options = options;
  }
}

module.exports = EngineCSS;
