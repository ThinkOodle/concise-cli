const sass = require('node-sass');
const postcss = require('postcss');

module.exports = (from, to) => {
  var compiledSass = sass.renderSync({
    file: from,
    outFile: to,
    sourceMap: true,
    sourceMapEmbed: true,
    sourceMapContents: true
  }).css;

  return postcss([
    require('postcss-input-range'),
    require('postcss-lh'),
    require('postcss-custom-media'),
    require('postcss-media-minmax'),
    require('autoprefixer')
  ]).process(compiledSass).css;
};
