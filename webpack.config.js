const path = require("path");

module.exports = (env = {}) => {
    return {
        mode: env.mode,
        entry: path.resolve(__dirname, "index.js"),
        output: {
            filename: env.mode === 'development' ? 'ng-lightgallery.js' : 'ng-lightgallery.min.js'
        },
        externals: {
            angular: "angular",
            jquery: "jQuery",
            lodash: "_"
        }
    }
}
