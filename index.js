'use strict';

const SVGO = require('svgo');

class SVGOBrunch {
    constructor(config) {
        this.options = Object.assign({}, config.plugins && config.plugins.svgo || {});
    }

    compileStatic({path, data}) {
        let optimized,error;
        const svgo = new SVGO(this.options);
        try {
            optimized = svgo.optimize(data);
        } catch (e) {
            error = 'SVG minification failed on ' + path + ': ' + e;
        } finally {
            if (error) return Promise.reject(error);
            const result = optimized.data;
            return Promise.resolve(result)
        }

    }
}


SVGOBrunch.prototype.brunchPlugin = true;
SVGOBrunch.prototype.staticTargetExtension = 'svg';
SVGOBrunch.prototype.staticExtension = 'svg';

module.exports = SVGOBrunch;