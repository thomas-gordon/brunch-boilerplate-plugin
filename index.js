'use strict';

const SVGO = require('svgo');

class SVGOBrunch {
  constructor(config) {
    this.options = Object.assign({}, config.plugins && config.plugins.svgo || {});
  }
  compileStatic({data}) {
    const svgo = new SVGO(this.options);
    return new Promise(resolve => {
      svgo.optimize(data, result => {
        data = result.data;
        resolve(data);
      });
    });
  }
}

SVGOBrunch.prototype.brunchPlugin = true;
SVGOBrunch.prototype.staticTargetExtension = 'svg';
SVGOBrunch.prototype.staticExtension = 'svg';

module.exports = SVGOBrunch;