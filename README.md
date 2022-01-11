# Eleventy plugin for processing CSS files

Adds CSS files to build pipeline with PostCSS processing. Include `postcss.config.js` in root folder of your project and start transforming CSS files without additional Eleventy setup.

## Installation

This plugin requires Eleventy 1.0.0.

```sh
npm install eleventy-postcss-extension
```

## Usage

```js
const pluginCSS = require("eleventy-postcss-extension");

module.exports = function(eleventyConfig) {
  eleventyConfig.addPlugin(pluginCSS);
};
```

Process your `*.css` files from your input directory. Any files living in your includes directory are by default available to import, not written to your output directory. This is achieved with using `postcss-import` by default when processing your CSS, which means you rather shouldn't explicitly enable this in your config (but you can). You can import your CSS as :

```css
@import 'vendor/reset.css';
/* import from `node_modules` also works */
@import 'tailwindcss/utilities';
```
