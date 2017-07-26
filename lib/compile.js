const sass = require('node-sass');
const postcss = require('postcss');

module.exports = (from, to) => {
  let compiledSass = '';
  try {
    compiledSass = sass.renderSync({
      file: from,
      outFile: to,
      sourceMap: true,
      sourceMapEmbed: true,
      sourceMapContents: true
    }).css;

    compiledSass = postcss([
      require('postcss-input-range'),
      require('postcss-lh'),
      require('postcss-custom-media'),
      require('postcss-media-minmax'),
      require('autoprefixer')
    ]).process(compiledSass).css;
  }
  catch(e){
    // e.formatted is more verbose and gives us line numbers and files for sass errors
    if(e.formatted){
      throw e.formatted;
    }

    throw e;
  }
};
