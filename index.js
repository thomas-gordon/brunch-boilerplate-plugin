'use strict';

const SVGO = require('svgo');

class SVGOBrunch {
  constructor(config) {
    this.options = config && config.plugins && config.plugins.svgo || {};
  }
  compile(file) {
    const svgo = new SVGO();
    // No transformation for now
    return new Promise(resolve => {
      svgo.optimize(file.data, result => {
        file.data = result.data;
        resolve(file);
      });
    });
  }
}

SVGOBrunch.prototype.brunchPlugin = true;
SVGOBrunch.prototype.extension = 'svg';
module.exports = SVGOBrunch;
