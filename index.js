'use strict';

const SVGO = require('svgo');

class SVGOBrunch {
    constructor(config) {
        this.options = Object.assign({}, config.plugins && config.plugins.svgo || {});
    }

    compileStatic({path,data,dependencies}) {

        let optimized, error, result;

        const svgo = new SVGO(this.options);

        try {
            return new Promise(resolve => {
              svgo.optimize(data, result => {
                data = result.data;
                resolve(data);
              });
            })
        } catch (e) {
            error = 'SVG minification failed on ' + path + ': ' + e;
        }

        if (error) {
            return Promise.reject(error);
        }

    }
}


SVGOBrunch.prototype.brunchPlugin = true;
SVGOBrunch.prototype.staticTargetExtension = 'svg';
SVGOBrunch.prototype.staticExtension = 'svg';

module.exports = SVGOBrunch;