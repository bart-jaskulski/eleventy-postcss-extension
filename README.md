# Eleventy plugin for processing CSS files

Adds CSS files to build pipeline with PostCSS processing. Include `postcss.config.js` in root folder of your project and start transforming CSS files without additional Eleventy setup.

## Installation

This plugin requires Eleventy 1.0.0 (starting from 1.0.0-beta.7 release).

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

Process your `*.css` files from your input directory. Any files living in your includes directory are by default available to import, not written to your output directory. (This is achieved with using `postcss-import` by default when processing your CSS, which means you rather shouldn't explicitly enable this in your config). You can import your CSS as:

```css
@import 'vendor/reset.css';
```

There's one big gotcha! By default, your files are saved as `.html` extension. To mitigate this issue you are required to create `.11tydata.js` file in folder with your `*.css` files with the following content:

```js
module.exports = {
  permalink: (data) => `/path/you/want/${data.page.fileSlug}.css`
}
```

## Changelog

### [0.1.0] - 18.11.2021

- Initial release with basic support for PostCSS processing inside Eleventy.

